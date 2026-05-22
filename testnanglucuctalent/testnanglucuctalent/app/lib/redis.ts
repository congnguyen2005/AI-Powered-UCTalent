import Redis from 'ioredis';

let redisInstance: Redis | null = null;

const getRedisUrl = () => {
  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL;
  }
  return null; // Không throw error, trả về null
};

export const getRedis = () => {
  if (!redisInstance) {
    const url = getRedisUrl();
    if (url) {
      try {
        redisInstance = new Redis(url);
      } catch (error) {
        console.warn('⚠️ Redis connection failed, using memory cache fallback');
        redisInstance = null;
      }
    }
  }
  return redisInstance;
};

// Export redis để tương thích code cũ
export const redis = {
  get: async (key: string) => {
    const client = getRedis();
    if (client) return client.get(key);
    return null;
  },
  setex: async (key: string, ttl: number, value: string) => {
    const client = getRedis();
    if (client) return client.setex(key, ttl, value);
    return null;
  },
  incr: async (key: string) => {
    const client = getRedis();
    if (client) return client.incr(key);
    return 1;
  },
  expire: async (key: string, seconds: number) => {
    const client = getRedis();
    if (client) return client.expire(key, seconds);
    return 1;
  },
  del: async (key: string) => {
    const client = getRedis();
    if (client) return client.del(key);
    return 0;
  },
};