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

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  process.env.FRONTEND_URL, // Allow production frontend URL
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

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
