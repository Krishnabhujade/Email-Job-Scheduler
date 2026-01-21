import { Queue } from "bullmq";
import { redis } from "../redis";

export const EMAIL_QUEUE_NAME = "email-queue";

export const emailQueue = new Queue(EMAIL_QUEUE_NAME, {
  connection: redis,
});
