import { openai } from './openai'
import { SENTIMENT_ANALYSIS_PROMPT } from './prompts'

export async function analyzeSentiment(reviewText: string) {
  try {
    const prompt = SENTIMENT_ANALYSIS_PROMPT.replace('{review_text}', reviewText)
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // hoặc gpt-3.5-turbo để tiết kiệm chi phí
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    })

    const result = JSON.parse(response.choices[0].message.content || '{}')
    console.log('✅ AI Phân tích cảm xúc thành công:', result.sentiment)
    return {
      sentiment: result.sentiment || 'neutral',
      score: result.score || 0.5,
      keyIssues: result.key_issues || [],
    }
  } catch (error) {
    console.error('❌ Lỗi phân tích cảm xúc:', error)
    return { sentiment: 'neutral', score: 0.5, keyIssues: [] }
  }
}