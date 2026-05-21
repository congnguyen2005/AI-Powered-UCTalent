import OpenAI from 'openai'

const apiKey = process.env.OPENAI_API_KEY

export const openai = apiKey ? new OpenAI({
  apiKey,
}) : null

export const isOpenAIAvailable = !!apiKey

export const getOpenAIClient = () => {
  if (!openai) {
    console.warn('⚠️ OpenAI API key not configured. AI features will use mock responses.')
  }
  return openai
}