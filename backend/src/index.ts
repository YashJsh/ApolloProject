import express from "express";
import cors from "cors";
import { doctorRouter } from "./routes/doctor";
import dotenv from "dotenv";
import { connectDB } from "./lib/db";

dotenv.config();

async function bootstrap() {
    await connectDB();          // ← ensure DB is online first

    const app = express();
    app.use(express.json());
    app.use(cors());
  
    // Mount your doctor routes
    app.use('/api', doctorRouter);
  
    app.listen(3006, () => {
      console.log('🚀 Server listening on http://localhost:3001');
    });
  }
  
  bootstrap();