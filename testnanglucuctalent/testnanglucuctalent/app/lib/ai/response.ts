import { openai } from './openai'
import { RESPONSE_GENERATION_PROMPT } from './prompts'

interface GenerateResponseOptions {
  companyName: string
  tone: string
  formality?: string
  length?: string
  values?: string[]
  reviewText: string
  sentiment: string
  priority: string
  count?: number
}

export async function generateAIResponse(options: GenerateResponseOptions) {
  const {
    companyName,
    tone,
    formality = 'chuyên nghiệp',
    length = 'ngắn gọn',
    values = ['chất lượng', 'dịch vụ'],
    reviewText,
    sentiment,
    priority,
    count = 3,
  } = options

  try {
    let prompt = RESPONSE_GENERATION_PROMPT
      .replace('{company_name}', companyName)
      .replace('{tone}', tone)
      .replace('{formality}', formality)
      .replace('{length}', length)
      .replace('{values}', values.join(', '))
      .replace('{review_text}', reviewText)
      .replace('{sentiment}', sentiment === 'positive' ? 'tích cực' : (sentiment === 'negative' ? 'tiêu cực' : 'trung tính'))
      .replace('{priority}', priority === 'critical' ? 'NGUY CẤP' : (priority === 'high' ? 'cao' : 'bình thường'))
      .replace('{count}', count.toString())

    const response = await openai.chat.completions.create({
      model: priority === 'critical' ? 'gpt-4o' : 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    })

    const result = JSON.parse(response.choices[0].message.content || '{}')
    console.log('✅ AI Tạo phản hồi thành công:', result.responses?.length || 0, 'lựa chọn')
    // Đảm bảo trả về đúng cấu trúc
    if (result.responses && Array.isArray(result.responses)) {
      return result.responses
    }
    // Fallback nếu AI trả về sai cấu trúc
    return [{ response: "Cảm ơn bạn đã phản hồi. Chúng tôi rất trân trọng ý kiến của bạn và sẽ liên hệ lại trong thời gian sớm nhất.", strategy: "chung" }]
  } catch (error) {
    console.error('❌ Lỗi tạo phản hồi:', error)
    return [{ response: "Xin lỗi vì sự chậm trễ. Chúng tôi đã ghi nhận đánh giá của bạn và đội ngũ sẽ phản hồi chi tiết trong 24h tới.", strategy: "fallback" }]
  }
}