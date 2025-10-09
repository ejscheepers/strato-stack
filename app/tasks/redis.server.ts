import { type ConnectionOptions } from "bullmq";
import Redis from "ioredis";

export const redisConnection: ConnectionOptions = {
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
};

export const kv = new Redis(process.env.REDIS_URL!, {
  password: process.env.REDIS_PASSWORD,
});
