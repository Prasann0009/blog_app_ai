import { createBlogPost, fetchPosts } from "./BlogService.js";

export async function createBlogController(req, res) {
  //TODO: remove default genre after testing
  const { description, genre } = req.body;
  if (!description || description.length > 500 || !genre) {
    return res.status(400).json({ message: "Invalid post" });
  }
  await createBlogPost({ userId: req.userId, description, genre });
  res.status(201).json({ message: "Post created successfully" });
}

export async function fetchAllBlogsController(_, res) {
  const serverResponse = {
    data: await fetchPosts(),
    message: "Posts fetched successfully",
  };
  res.status(200).json(serverResponse);
}
