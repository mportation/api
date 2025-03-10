import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";
import cookieParser from "cookie-parser";
import connectDb from "./lib/dbConnection.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import uploadRouter from "./routes/uploadRouter.js";

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 5000;

connectDb();

const app = express();
// Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/upload", uploadRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
