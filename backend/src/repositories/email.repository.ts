import { pool } from "../db";

export const createEmail = async (
  toEmail: string,
  subject: string,
  body: string,
  scheduledAt: Date
) => {
  const result = await pool.query(
    `
    INSERT INTO emails (to_email, subject, body, scheduled_at)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [toEmail, subject, body, scheduledAt]
  );

  return result.rows[0];
};

export const updateEmailStatus = async (
  emailId: number,
  status: "sent" | "failed"
) => {
  await pool.query(
    `
    UPDATE emails
    SET status = $1
    WHERE id = $2
    `,
    [status, emailId]
  );
};
