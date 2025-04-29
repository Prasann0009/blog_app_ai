import { createBlogPost, fetchPosts } from "./BlogService.js";
import { genres } from "../routes/GenreRoutes.js";

export async function createBlogController(req, res) {
  //TODO:: remove default genre after testing
  const { description, genre } = req.body;
  if (!description || description.length > 500 || !genre) {
    return res.status(400).json({ message: "Invalid post" });
  }
  await createBlogPost({ userId: req.userId, description, genre });
  res.status(201).json({ message: "Post created successfully" });
}

export async function fetchAllBlogsController(req, res) {
  const requestedGenre = req.query.genre;
  let isValidGenre = false;
  for (let genre of genres) {
    if (genre.id === requestedGenre) {
      isValidGenre = true;
      break;
    }
  }
  if (!isValidGenre) {
    return res.status(400).json({ message: "Please add a genre" });
  }
  const serverResponse = {
    data: await fetchPosts(requestedGenre),
    message: "Posts fetched successfully",
  };
  res.status(200).json(serverResponse);
}
