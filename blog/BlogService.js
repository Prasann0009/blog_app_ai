import Blog from "../models/BlogModel.js";
import { User } from "../models/UserModel.js";

export async function createBlogPost({ description, genre, userId }) {
  const blog = new Blog({
    description,
    genre,
    userId,
  });
  await blog.save();
}

export async function fetchPosts() {
  const posts = await Blog.find(
    {},
    { createdAt: true, userId: true, description: true, genre: true, _id: true }
  );

  //100posts
  const uniqueUserIds = new Set();
  posts.forEach((post) => {
    uniqueUserIds.add(post.userId);
  });

  const users = await User.find(
    { _id: { $in: [...uniqueUserIds] } },
    { _id: true, name: true }
  );

  //{userId:name}
  const userMap = new Map();
  users.forEach((user) => {
    userMap.set(user._id.toString(), user.name);
  });

  const postsResponse = [];
  posts.forEach((post) => {
    const postResponse = {
      postId: post._id,
      timestamp: post.createdAt,
      description: post.description,
      genre: post.genre,
      authorName: userMap.get(post.userId.toString()),
    };
    postsResponse.push(postResponse);
  });
  return postsResponse;
}
