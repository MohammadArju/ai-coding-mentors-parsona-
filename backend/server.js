import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import chatRoutes from "./Routes/chat.Routes.js";
import userRoutes from "./Routes/user.Routes.js";
import connectDB from "./config/db.js";
import path   from "path"

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
     exposedHeaders: ["x-chat-id"],
  })
);
const _dirname = path.resolve();

app.use(express.json());
app.use(cookieParser()); // ✅ Add this

app.use("/api", chatRoutes);
app.use("/api/user", userRoutes);

app.use(express.static(path.join(_dirname, "/frontend/dist")));

await connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);