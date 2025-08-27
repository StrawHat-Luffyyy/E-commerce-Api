import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import { protect, adminOnly } from "./middlewares/auth.middleware.js";

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

// Routes placeholder
app.get("/", (req, res) => {
  res.send("E-Commerce API is running...");
});
// dummy testing
app.get("/api/test/protected", protect, (req, res) => {
  res.json({ message: `Welcome ${req.user.name}, you are authorized!` });
});

app.get("/api/test/admin", protect, adminOnly, (req, res) => {
  res.json({ message: "Admin access granted" });
});

// DB + Server Start
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});
