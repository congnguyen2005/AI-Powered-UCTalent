// app/lib/ai/client.ts (đã có, bổ sung thêm)
import OpenAI from 'openai'

const apiKey = process.env.OPENAI_API_KEY

export const openai = apiKey ? new OpenAI({ apiKey }) : null

export const isOpenAIAvailable = !!apiKey && apiKey !== 'your_openai_api_key'

// Cache cho AI responses
const aiCache = new Map<string, { data: any; expiry: number }>()

export async function callAIWithCache<T>(
  cacheKey: string,
  prompt: string,
  options: { model?: string; temperature?: number; ttl?: number } = {}
): Promise<T> {
  const { model = 'gpt-4o-mini', temperature = 0.3, ttl = 3600 } = options
  
  // Kiểm tra cache
  const cached = aiCache.get(cacheKey)
  if (cached && Date.now() < cached.expiry) {
    return cached.data as T
  }

  if (!openai) {
    // Fallback cho demo mode
    console.log('🤖 AI Demo Mode: Using mock response')
    return {} as T
  }

  try {
    const response = await openai.chat.completions.create({
      model,
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature,
    })

    const result = JSON.parse(response.choices[0].message.content || '{}')
    
    // Lưu cache
    aiCache.set(cacheKey, { data: result, expiry: Date.now() + ttl * 1000 })
    
    return result as T
  } catch (error) {
    console.error('AI API Error:', error)
    return {} as T
  }
}

export function clearAICache() {
  aiCache.clear()
}