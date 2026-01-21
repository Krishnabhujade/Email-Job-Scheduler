import dotenv from "dotenv";
dotenv.config(); // 👈 MUST be at the top

import app from "./app";
import { connectDB } from "./db";
import "./redis"; // 👈 this triggers Redis connection

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
