import { Worker, Job } from "bullmq";
import { redis } from "../redis";
import { EMAIL_QUEUE_NAME } from "../queues/email.queue";
import { updateEmailStatus } from "../repositories/email.repository";

const worker = new Worker(
  EMAIL_QUEUE_NAME,
  async (job: Job) => {
    const { emailId } = job.data;

    console.log("JOB NAME:", job.name);
    console.log("Processing emailId:", emailId);

    try {
      // (Actual email sending will come in Step 6)

      // Mark email as sent in DB
      await updateEmailStatus(emailId, "sent");

      console.log("Email marked as sent:", emailId);
    } catch (error) {
      await updateEmailStatus(emailId, "failed");
      console.error("Email failed:", emailId);
      throw error;
    }
  },
  {
    connection: redis,
    concurrency: 1,
  }
);

worker.on("completed", (job: Job) => {
  console.log("Job completed:", job.id);
});

worker.on("failed", (job, err) => {
  console.error("Job failed:", job?.id, err);
});
