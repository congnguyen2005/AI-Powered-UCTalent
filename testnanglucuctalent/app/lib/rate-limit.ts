import { redis } from './redis';

interface RateLimitConfig {
  limit: number;
  window: number; // seconds
}

export async function rateLimit(key: string, config: RateLimitConfig): Promise<boolean> {
  try {
    const current = await redis.incr(key);
    if (current === 1) {
      await redis.expire(key, config.window);
    }
    return current <= config.limit;
  } catch (error) {
    // Nếu Redis lỗi, cho phép request (fallback)
    console.warn('Rate limit check failed, allowing request');
    return true;
  }
}