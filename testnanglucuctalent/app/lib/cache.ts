import { redis } from './redis'

export async function getCache<T>(key: string): Promise<T | null> {
  try {
    const data = await redis.get(key)
    if (!data) return null
    return JSON.parse(data) as T
  } catch (error) {
    console.warn(`Cache get error for key ${key}:`, error)
    return null
  }
}

export async function setCache(key: string, data: any, ttl: number = 300): Promise<void> {
  try {
    await redis.setex(key, ttl, JSON.stringify(data))
  } catch (error) {
    console.warn(`Cache set error for key ${key}:`, error)
  }
}

export async function deleteCache(key: string): Promise<void> {
  try {
    await redis.del(key)
  } catch (error) {
    console.warn(`Cache delete error for key ${key}:`, error)
  }
}

export async function clearCacheByPattern(pattern: string): Promise<void> {
  // Note: In production, you might want to implement pattern-based deletion
  console.log(`Clear cache pattern: ${pattern}`)
}