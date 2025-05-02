import express from "express";
import cors from "cors";
import { doctorRouter } from "./routes/doctor";
import dotenv from "dotenv";
import { connectDB } from "./lib/db";

dotenv.config();

async function bootstrap() {
  await connectDB();

  const app = express();

  app.use(express.json());

  const allowedOrigins = [
    "http://localhost:3000",
    "https://apollo-project.vercel.app"
  ];

  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true, // if you're using cookies or auth headers
  }));

  // Routes
  app.use("/api", doctorRouter);

  const PORT = process.env.PORT || 3001;

  app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
  });
}

bootstrap();
