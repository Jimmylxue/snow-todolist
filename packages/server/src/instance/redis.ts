import Redis from 'ioredis';

import { redisConfig } from '@src/config/redis';

export class RedisInstance {
  static redis: Redis = null;
  static async initRedis() {
    if (!this.redis) {
      this.redis = new Redis(redisConfig);
      this.redis.on('error', (err) => console.log('Redis cluster Error', err));
      this.redis.on('connect', () => console.log('redis连接成功'));
    }
    return this.redis;
  }
}

export function getRedisInstance() {}
