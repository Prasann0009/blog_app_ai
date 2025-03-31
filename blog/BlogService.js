import Blog from "../models/BlogModel.js";

export async function createBlogPost({ description, genre, userId }) {
  const blog = new Blog({
    description,
    genre,
    userId,
  });
  await blog.save();
}
