// Fallback cache in-memory đơn giản nếu chưa có Redis
class MemoryCache {
  private store = new Map()
  async get(key: string) {
    const item = this.store.get(key)
    if (!item) return null
    if (Date.now() > item.expiry) {
      this.store.delete(key)
      return null
    }
    return item.value
  }
  async set(key: string, value: any, ttl: number) {
    this.store.set(key, { value, expiry: Date.now() + ttl * 1000 })
  }
  async del(key: string) {
    this.store.delete(key)
  }
}

const memoryCache = new MemoryCache()

export async function getCache<T>(key: string): Promise<T | null> {
  try {
    // Thử dùng Redis nếu có
    const { redis } = await import('./redis')
    const data = await redis.get(key)
    if (!data) return null
    return JSON.parse(data)
  } catch (error) {
    // Fallback sang memory cache
    return await memoryCache.get(key)
  }
}

export async function setCache(key: string, data: any, ttl = 300): Promise<void> {
  try {
    const { redis } = await import('./redis')
    await redis.setex(key, ttl, JSON.stringify(data))
  } catch (error) {
    await memoryCache.set(key, data, ttl)
  }
}

export async function deleteCache(key: string): Promise<void> {
  try {
    const { redis } = await import('./redis')
    await redis.del(key)
  } catch (error) {
    await memoryCache.del(key)
  }
}