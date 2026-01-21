import { Redis } from "bullmq/node_modules/ioredis";
import dotenv from "dotenv";

dotenv.config();

export const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  maxRetriesPerRequest: null, // ✅ REQUIRED by BullMQ
});

redis.on("connect", () => {
  console.log("✅ Redis connected");
});

redis.on("error", (err: Error) => {
  console.error("❌ Redis error", err);
});
