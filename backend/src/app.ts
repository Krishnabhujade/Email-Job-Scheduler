import express, { Request, Response } from "express";
import cors from "cors";
import { emailQueue } from "./queues/email.queue";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_, res: Response) => {
  res.json({ status: "OK" });
});

app.post("/test-job", async (req: Request, res: Response) => {
  await emailQueue.add(
    "test-job",
    { text: "Hello from BullMQ" },
    { delay: 5000 }
  );

  res.json({ message: "Job scheduled after 5 seconds" });
});

export default app;
