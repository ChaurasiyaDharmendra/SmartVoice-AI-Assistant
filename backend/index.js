// import express from "express"
// import dotenv from "dotenv"
// dotenv.config()
// import connectDb from "./config/db.js"
// import authRouter from "./routes/auth.routes.js"
// import cors from "cors"
// import cookieParser from "cookie-parser"
// import userRouter from "./routes/user.routes.js"
// //import geminiResponse from "./gemini.js"
// //import {geminiResponse} from "./gemini.js"




// const port=process.env.PORT || 5000
// app.use(express.json())
// app.use(cookieParser())
// app.use("/api/auth",authRouter)
// app.use("/api/user",userRouter)


// app.listen(port,()=>{
//     connectDb()
//     console.log("server started")
// })

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
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend
      "https://smartvoice-ai-assistant.vercel.app" // 👈 baad me frontend deploy hoga
    ],
    credentials: true,
  })
);

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