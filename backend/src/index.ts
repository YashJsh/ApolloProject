import express from "express";
import cors from "cors";
import { doctorRouter } from "./routes/doctor";
import dotenv from "dotenv";
import { connectDB } from "./lib/db";

dotenv.config();

async function bootstrap() {
  await connectDB(); // ensure DB is connected before starting server

  const app = express();
  app.use(express.json());
  app.use(cors());

  // Mount your doctor routes
  app.use("/api", doctorRouter);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
  });
}

bootstrap();
