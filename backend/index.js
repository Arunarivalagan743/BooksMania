import express from "express";
import dotenv from "dotenv";
import "./db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { AdminRouter } from "./routes/auth.js";



const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
dotenv.config();



app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/auth", AdminRouter);

app.listen(process.env.PORT , () => {
  console.log(`Server is running on port ${process.env.PORT }`);
});
