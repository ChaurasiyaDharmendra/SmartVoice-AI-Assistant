import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";

dotenv.config();

const app = express();

/* ================= CORS ================= */
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://smart-voice-ai-assistant.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// ❌ isko hata de (ye crash kar raha tha)
// app.options("*", cors());

/* ================= MIDDLEWARE ================= */
app.use(express.json());
app.use(cookieParser());

/* ================= ROUTES ================= */
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

/* ================= SERVER ================= */
const port = process.env.PORT || 5000;

app.listen(port, () => {
  connectDb();
  console.log(`Server started on port ${port}`);
});