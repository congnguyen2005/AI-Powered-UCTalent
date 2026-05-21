// app/api/ai/generate-response/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/app/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const authUser = getAuthUser(request)
    if (!authUser) {
      return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 })
    }

    const { reviewId, reviewText, customTone, customOptions } = await request.json()

    if (!reviewText) {
      return NextResponse.json({ error: 'Thiếu nội dung đánh giá' }, { status: 400 })
    }

    console.log(`🤖 Đang phân tích review cho: ${authUser.email}`)

    // Phân tích sentiment đơn giản (mock)
    const lowerText = reviewText.toLowerCase()
    let sentiment = 'neutral'
    let sentimentScore = 0.5
    
    const positiveWords = ['tuyệt', 'tốt', 'hay', 'cảm ơn', 'hài lòng', 'đẹp', 'ngon', 'nhiệt tình']
    const negativeWords = ['tệ', 'kém', 'chậm', 'bẩn', 'thất vọng', 'tồi', 'dở', 'khó chịu', 'thảm họa', 'rệp']
    
    let positiveCount = positiveWords.filter(w => lowerText.includes(w)).length
    let negativeCount = negativeWords.filter(w => lowerText.includes(w)).length
    
    if (positiveCount > negativeCount) {
      sentiment = 'positive'
      sentimentScore = 0.7 + (positiveCount * 0.05)
    } else if (negativeCount > positiveCount) {
      sentiment = 'negative'
      sentimentScore = 0.3 - (negativeCount * 0.05)
    }
    
    sentimentScore = Math.min(0.95, Math.max(0.05, sentimentScore))

    // Phát hiện khủng hoảng
    const crisisWords = ['kiện', 'báo chí', 'truyền thông', 'viral', 'facebook', 'hội nhóm', 'chia sẻ', 'rệp', 'ngộ độc', 'tai nạn']
    let crisisDetected = crisisWords.some(w => lowerText.includes(w))
    let riskLevel = crisisDetected ? (lowerText.includes('thảm họa') ? 'critical' : 'high') : 'low'
    
    // Xác định priority
    let priority = 'low'
    if (sentiment === 'negative') priority = 'high'
    if (riskLevel === 'critical') priority = 'critical'
    if (riskLevel === 'high') priority = 'high'

    // Tạo phản hồi AI mẫu
    const responses = []
    
    if (sentiment === 'positive') {
      responses.push(
        `Cảm ơn ${reviewText.includes('ạ') ? 'bạn' : 'anh/chị'} đã dành thời gian đánh giá tích cực về chúng tôi! ${reviewText.includes('sẽ') ? 'Chúng tôi rất vui khi biết bạn sẽ quay lại' : 'Chúng tôi rất vui khi được phục vụ bạn'}. Hẹn gặp lại!`
      )
      responses.push(
        `${reviewText.includes('cảm ơn') ? 'Chúng tôi cũng xin cảm ơn' : 'Trân trọng cảm ơn'} những lời khen của ${reviewText.includes('ạ') ? 'bạn' : 'anh/chị'}. Đây là động lực để chúng tôi ngày càng hoàn thiện hơn.`
      )
      responses.push(
        `Thật vui khi nhận được đánh giá tốt từ ${reviewText.includes('ạ') ? 'bạn' : 'anh/chị'}! Chúng tôi sẽ cố gắng duy trì chất lượng dịch vụ. Mong tiếp tục được đồng hành cùng bạn!`
      )
    } else if (sentiment === 'negative') {
      if (priority === 'critical') {
        responses.push(
          `⚠️ [KHẨN CẤP] Chúng tôi vô cùng xin lỗi về trải nghiệm tồi tệ của ${reviewText.includes('ạ') ? 'bạn' : 'anh/chị'}. Đội ngũ quản lý đã được báo động đỏ và sẽ xử lý ngay lập tức. Xin vui lòng liên hệ hotline 1900xxxx để được hỗ trợ trực tiếp.`
        )
        responses.push(
          `Kính gửi ${reviewText.includes('ạ') ? 'bạn' : 'anh/chị'}, chúng tôi rất tiếc về sự cố này. Đây là vấn đề nghiêm trọng cần được giải quyết ưu tiên cao nhất. Ban giám đốc đã trực tiếp chỉ đạo xử lý. Mong bạn thông cảm và cho chúng tôi cơ hội khắc phục.`
        )
      } else {
        responses.push(
          `Xin lỗi ${reviewText.includes('ạ') ? 'bạn' : 'anh/chị'} vì trải nghiệm không tốt. Chúng tôi đã ghi nhận ý kiến về "${reviewText.split('.')[0].slice(0, 50)}..." và sẽ cải thiện ngay.`
        )
        responses.push(
          `Cảm ơn ${reviewText.includes('ạ') ? 'bạn' : 'anh/chị'} đã phản hồi. Chúng tôi rất coi trọng ý kiến đóng góp và sẽ xem xét để nâng cao chất lượng dịch vụ. Mong được phục vụ bạn tốt hơn trong tương lai.`
        )
      }
      responses.push(
        `Chúng tôi thành thật xin lỗi vì sự bất tiện. Bộ phận chăm sóc khách hàng sẽ liên hệ lại với ${reviewText.includes('ạ') ? 'bạn' : 'anh/chị'} trong 24h tới để giải đáp thắc mắc.`
      )
    } else {
      responses.push(
        `Cảm ơn ${reviewText.includes('ạ') ? 'bạn' : 'anh/chị'} đã góp ý. Chúng tôi sẽ xem xét những điểm ${reviewText.includes('chưa') ? 'cần cải thiện' : 'đã làm tốt'} để nâng cao trải nghiệm khách hàng.`
      )
      responses.push(
        `Xin cảm ơn phản hồi của ${reviewText.includes('ạ') ? 'bạn' : 'anh/chị'}. Mọi đóng góp đều quý giá với chúng tôi. Chúc bạn một ngày tốt lành!`
      )
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
    console.error('❌ Lỗi AI:', error)
    return NextResponse.json(
      { error: 'AI không thể tạo phản hồi lúc này' },
      { status: 500 }
    )
  }
}