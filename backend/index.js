import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { AdminRouter } from "./routes/auth.js";
import { StudentRouter } from "./routes/student.js";


const app = express();
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
connectDB();
dotenv.config();



app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/auth", AdminRouter);

app.use("/student", StudentRouter);

app.listen(process.env.PORT , () => {
  console.log(`Server is running on port ${process.env.PORT }`);
});
