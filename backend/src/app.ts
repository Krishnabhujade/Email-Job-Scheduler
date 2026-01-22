import express, { Request, Response } from "express";
import cors from "cors";
import { emailQueue } from "./queues/email.queue";
import { createEmail } from "./repositories/email.repository";

const app = express();

// ──────────────────────
// Middleware
// ──────────────────────
app.use(cors());
app.use(express.json());

// ──────────────────────
// Health Check
// ──────────────────────
app.get("/health", (_: Request, res: Response) => {
  res.json({ status: "OK" });
});

// ──────────────────────
// Test Email Scheduling (STEP 5)
// ──────────────────────
app.post("/test-job", async (_: Request, res: Response) => {
  try {
    // 1️⃣ Save email in PostgreSQL
    const email = await createEmail(
      "test@example.com",
      "Test Subject",
      "Hello from scheduled email",
      new Date(Date.now() + 5000) // 5 seconds later
    );

    // 2️⃣ Schedule BullMQ job with emailId
    await emailQueue.add(
      "send-email",
      { emailId: email.id },
      { delay: 5000 }
    );

    // 3️⃣ Respond to client
    res.status(200).json({
      message: "Email scheduled successfully",
      emailId: email.id,
    });
  } catch (error) {
    console.error("Failed to schedule email:", error);

    res.status(500).json({
      message: "Failed to schedule email",
    });
  }
});

export default app;
