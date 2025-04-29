import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { connectToMongoDB } from "./connection.js";
import AuthRouter from "./routes/AuthRoutes.js";
import BlogRouter from "./routes/BlogRoutes.js";
import CommentRouter from "./routes/CommentRoutes.js";
import GenresRouter from "./routes/GenreRoutes.js";
import { getSentiment } from "./blog/sentiment.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());

app.use(express.json());

connectToMongoDB();

app.use("/auth", AuthRouter);
app.use("/blog", BlogRouter);
app.use("/comment", CommentRouter);
app.use("/genres", GenresRouter);

app.listen(PORT, () => {
  console.log(`app is listening at port http://localhost:${PORT}`);
});

// getSentiment();
