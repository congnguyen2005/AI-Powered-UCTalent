import Redis from 'ioredis'

let redisInstance: Redis | null = null
let isRedisAvailable = false

const getRedisUrl = () => {
  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL
  }
  return null
}

export const getRedis = () => {
  if (!redisInstance && !isRedisAvailable) {
    const url = getRedisUrl()
    if (url) {
      try {
        redisInstance = new Redis(url, {
          maxRetriesPerRequest: 3,
          retryStrategy: (times) => {
            if (times > 3) {
              console.warn('⚠️ Redis connection failed after 3 retries, using memory cache fallback')
              isRedisAvailable = false
              return null
            }
            return Math.min(times * 100, 3000)
          },
        })
        
        redisInstance.on('connect', () => {
          console.log('✅ Redis connected')
          isRedisAvailable = true
        })
        
        redisInstance.on('error', (err) => {
          console.warn('⚠️ Redis error:', err.message)
          isRedisAvailable = false
        })
      } catch (error) {
        console.warn('⚠️ Redis connection failed, using memory cache fallback')
        redisInstance = null
        isRedisAvailable = false
      }
    }
  }
  return isRedisAvailable ? redisInstance : null
}

// Memory cache fallback
const memoryCache = new Map<string, { value: any; expiry: number }>()

export const redis = {
  get: async (key: string): Promise<string | null> => {
    const client = getRedis()
    if (client) {
      try {
        return await client.get(key)
      } catch {
        return null
      }
    }
    const item = memoryCache.get(key)
    if (item && Date.now() < item.expiry) {
      return typeof item.value === 'string' ? item.value : JSON.stringify(item.value)
    }
    memoryCache.delete(key)
    return null
  },
  
  setex: async (key: string, ttl: number, value: string): Promise<'OK' | null> => {
    const client = getRedis()
    if (client) {
      try {
        return await client.setex(key, ttl, value)
      } catch {
        memoryCache.set(key, { value, expiry: Date.now() + ttl * 1000 })
        return 'OK'
      }
    }
    memoryCache.set(key, { value, expiry: Date.now() + ttl * 1000 })
    return 'OK'
  },
  
  incr: async (key: string): Promise<number> => {
    const client = getRedis()
    if (client) {
      try {
        return await client.incr(key)
      } catch {
        const current = memoryCache.get(key)
        const newValue = current ? (parseInt(current.value) + 1) : 1
        memoryCache.set(key, { value: newValue, expiry: Date.now() + 3600000 })
        return newValue
      }
    }
    const current = memoryCache.get(key)
    const newValue = current ? (parseInt(current.value) + 1) : 1
    memoryCache.set(key, { value: newValue, expiry: Date.now() + 3600000 })
    return newValue
  },
  
  expire: async (key: string, seconds: number): Promise<number> => {
    const client = getRedis()
    if (client) {
      try {
        return await client.expire(key, seconds)
      } catch {
        const item = memoryCache.get(key)
        if (item) {
          memoryCache.set(key, { ...item, expiry: Date.now() + seconds * 1000 })
        }
        return 1
      }
    }
    const item = memoryCache.get(key)
    if (item) {
      memoryCache.set(key, { ...item, expiry: Date.now() + seconds * 1000 })
    }
    return 1
  },
  
  del: async (key: string): Promise<number> => {
    const client = getRedis()
    if (client) {
      try {
        return await client.del(key)
      } catch {
        memoryCache.delete(key)
        return 1
      }
    }
    memoryCache.delete(key)
    return 1
  },
}