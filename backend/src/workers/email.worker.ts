import { Worker, Job } from "bullmq";
import { redis } from "../redis";
import { EMAIL_QUEUE_NAME } from "../queues/email.queue";

const worker = new Worker(
  EMAIL_QUEUE_NAME,
  async (job: Job) => {
    console.log("Job executed:");
    console.log(job.data);
  },
  {
    connection: redis,
    concurrency: 1,
  }
);

worker.on("completed", (job: Job) => {
  console.log("Job completed");
});
