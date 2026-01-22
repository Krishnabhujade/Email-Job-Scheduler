import dotenv from "dotenv";
dotenv.config(); // 👈 MUST be at the top

import app from "./app";
import { connectDB } from "./db";
import "./redis"; // 👈 this triggers Redis connection

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  let retries = 5;
  
  while (retries > 0) {
    try {
      await connectDB();
      break;
    } catch (error) {
      retries--;
      if (retries > 0) {
        console.log(`Retrying database connection... (${retries} attempts left)`);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before retry
      } else {
        throw error;
      }
    }
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
