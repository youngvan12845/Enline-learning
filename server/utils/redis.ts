import { Redis } from "ioredis";

const redis = new Redis({
  host: "127.0.0.1", // Redis 的主机地址
  port: 6379,        // Redis 的端口号
});

redis.on("connect", () => {
  console.log("Connected to Redis!");
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

export default redis;
