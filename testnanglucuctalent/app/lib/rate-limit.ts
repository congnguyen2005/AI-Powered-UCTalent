import { redis } from './redis'

interface RateLimitConfig {
  limit: number
  window: number // seconds
}

export async function rateLimit(key: string, config: RateLimitConfig): Promise<{ success: boolean; remaining: number; reset: number }> {
  try {
    const current = await redis.incr(key)
    if (current === 1) {
      await redis.expire(key, config.window)
    }
    
    const remaining = Math.max(0, config.limit - current)
    const reset = Math.floor(Date.now() / 1000) + config.window
    
    return {
      success: current <= config.limit,
      remaining,
      reset,
    }
  } catch (error) {
    console.warn('Rate limit check failed, allowing request')
    return { success: true, remaining: config.limit, reset: Math.floor(Date.now() / 1000) + config.window }
  }
}

export const RATE_LIMITS = {
  API: { limit: 100, window: 60 },      // 100 requests per minute
  AI: { limit: 30, window: 60 },         // 30 AI requests per minute
  AUTH: { limit: 10, window: 60 },       // 10 login attempts per minute
}