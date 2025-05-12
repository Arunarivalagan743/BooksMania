import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { AdminRouter } from "./routes/auth.js";
import { StudentRouter } from "./routes/student.js";
import { BookRouter } from "./routes/book.js";
import { Book } from "./models/Book.js";
import { Student } from "./models/Student.js";
import { Admin } from "./models/Admin.js";

dotenv.config(); // ✅ load .env first

const app = express();

connectDB();

const allowedOrigins = [
  "http://localhost:5173",
  "https://bookmakk.netlify.app", // ✅ frontend domain
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

// ✅ USE CORS middleware (this was missing)
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/auth", AdminRouter);
app.use("/student", StudentRouter);
app.use("/book", BookRouter);

// Dashboard counts
app.use("/dashboard", async (req, res) => {
  try {
    const books = await Book.countDocuments();
    const students = await Student.countDocuments();
    const admins = await Admin.countDocuments();
    return res.json({ ok: true, books, students, admins });
  } catch (err) {
    console.log(err);
    res.status(500).json({ ok: false, message: "Server error" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
