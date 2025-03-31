import { model, Schema } from "mongoose";

const BlogSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
    default: "politics",
  },
});

const Blog = model("Blog", BlogSchema);

export default Blog;
