import { openai } from './openai'
import { CRISIS_DETECTION_PROMPT } from './prompts'

export async function detectCrisis(reviewText: string) {
  try {
    const prompt = CRISIS_DETECTION_PROMPT.replace('{review_text}', reviewText)
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.2,
    })

    const result = JSON.parse(response.choices[0].message.content || '{}')
    console.log('✅ AI Phát hiện khủng hoảng:', result.risk_level)
    return {
      crisisScore: result.crisis_score || 0,
      riskLevel: result.risk_level || 'low',
      reasons: result.reasons || [],
      recommendedAction: result.recommended_action || 'monitor',
    }
  } catch (error) {
    console.error('❌ Lỗi phát hiện khủng hoảng:', error)
    return { crisisScore: 0, riskLevel: 'low', reasons: [], recommendedAction: 'monitor' }
  }
}