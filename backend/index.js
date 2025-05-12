import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { AdminRouter } from "./routes/auth.js";
import { StudentRouter } from "./routes/student.js";
import { BookRouter } from "./routes/book.js";
import { Book
 } from "./models/Book.js";
 import { Student } from "./models/Student.js";
import { Admin } from "./models/Admin.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://main--bookmakk.netlify.app",  // ✅ Add your Netlify/Vercel domain here
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

app.use(express.json());
app.use(cookieParser());
connectDB();
dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/auth", AdminRouter);

app.use("/student", StudentRouter);
app.use("/book", BookRouter);

app.use('/dashboard',async(req,res)=>{ 
try{
const books = await Book.countDocuments();
const students = await Student.countDocuments();
const admins = await Admin.countDocuments();
return res.json({ok:true,books,students,admins});
}
catch(err){
  console.log(err);
}
  })



app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
