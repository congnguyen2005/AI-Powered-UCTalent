import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '../../../lib/auth'
import { rateLimit, RATE_LIMITS } from '../../../lib/rate-limit'
import { isOpenAIAvailable } from '../../../lib/openai'

function analyzeSentiment(text: string): { sentiment: string; score: number } {
  const lowerText = text.toLowerCase()
  const positiveWords = ['tuyệt', 'tốt', 'hay', 'cảm ơn', 'hài lòng', 'đẹp', 'ngon', 'nhiệt tình', 'tuyệt vời']
  const negativeWords = ['tệ', 'kém', 'chậm', 'bẩn', 'thất vọng', 'tồi', 'dở', 'khó chịu', 'thảm họa', 'rệp']
  
  const positiveCount = positiveWords.filter(w => lowerText.includes(w)).length
  const negativeCount = negativeWords.filter(w => lowerText.includes(w)).length
  
  if (positiveCount > negativeCount) {
    return { sentiment: 'positive', score: Math.min(0.95, 0.7 + positiveCount * 0.05) }
  } else if (negativeCount > positiveCount) {
    return { sentiment: 'negative', score: Math.max(0.05, 0.3 - negativeCount * 0.05) }
  }
  return { sentiment: 'neutral', score: 0.5 }
}

function detectCrisis(text: string): { riskLevel: string; crisisDetected: boolean } {
  const lowerText = text.toLowerCase()
  const crisisWords = ['kiện', 'báo chí', 'truyền thông', 'viral', 'facebook', 'hội nhóm', 'chia sẻ', 'rệp', 'ngộ độc', 'tai nạn', 'thảm họa']
  const crisisDetected = crisisWords.some(w => lowerText.includes(w))
  const riskLevel = crisisDetected ? (lowerText.includes('thảm họa') ? 'critical' : 'high') : 'low'
  return { riskLevel, crisisDetected }
}

export async function POST(request: NextRequest) {
  try {
    const authUser = getAuthUser(request)
    if (!authUser) {
      return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 })
    }

    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const rateLimitResult = await rateLimit(`ai:${ip}`, RATE_LIMITS.AI)
    if (!rateLimitResult.success) {
      return NextResponse.json({ error: 'Quá nhiều yêu cầu AI, vui lòng thử lại sau' }, { status: 429 })
    }

    const { reviewId, reviewText, customTone, customOptions } = await request.json()

    if (!reviewText) {
      return NextResponse.json({ error: 'Thiếu nội dung đánh giá' }, { status: 400 })
    }

    const { sentiment, score: sentimentScore } = analyzeSentiment(reviewText)
    const { riskLevel, crisisDetected } = detectCrisis(reviewText)
    
    let priority = 'low'
    if (sentiment === 'negative') priority = 'high'
    if (riskLevel === 'critical') priority = 'critical'
    if (riskLevel === 'high') priority = 'high'

    const responses: string[] = []
    
    if (sentiment === 'positive') {
      responses.push(`Cảm ơn bạn đã dành thời gian đánh giá tích cực về chúng tôi! Chúng tôi rất vui khi được phục vụ bạn. Hẹn gặp lại!`)
      responses.push(`Trân trọng cảm ơn những lời khen của bạn. Đây là động lực để chúng tôi ngày càng hoàn thiện hơn.`)
    } else if (sentiment === 'negative') {
      if (riskLevel === 'critical') {
        responses.push(`⚠️ [KHẨN CẤP] Chúng tôi vô cùng xin lỗi về trải nghiệm tồi tệ của bạn. Đội ngũ quản lý đã được báo động đỏ và sẽ xử lý ngay lập tức.`)
      } else {
        responses.push(`Xin lỗi bạn vì trải nghiệm không tốt. Chúng tôi đã ghi nhận ý kiến của bạn và sẽ cải thiện ngay.`)
      }
    } else {
      responses.push(`Cảm ơn bạn đã góp ý. Chúng tôi sẽ xem xét để nâng cao trải nghiệm khách hàng.`)
    }

    return NextResponse.json({
      reviewId,
      sentiment,
      sentimentScore,
      crisis: { riskLevel, crisisDetected },
      priority,
      responses: responses.slice(0, customOptions?.count || 3),
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Lỗi AI:', error)
    return NextResponse.json({ error: 'AI không thể tạo phản hồi lúc này' }, { status: 500 })
  }
}