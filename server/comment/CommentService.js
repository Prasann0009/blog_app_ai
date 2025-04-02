import Blog from "../models/BlogModel.js";

export async function addComment(comment, userId, postId) {
  const commentInstance = { text: comment, userId, createdAt: Date.now() };

  try {
    const blog = await Blog.findOneAndUpdate(
      { _id: postId },
      { $push: { comments: commentInstance } },
      { _id: 1 }
    );

    if (!blog) {
      console.log(
        `Failed to add new comment: blog with id: ${postId} is not found`
      );
      return 400;
    }
    return 201;
  } catch (error) {
    console.log("Failed adding comment due to server error");
    return 500;
  }
}

export async function fetchAllCommentsbyPostId(postId) {
  const { comments, _id: postId } = await Blog.findById(postId, {
    comments: 1,
    _id: 1,
  });
  const uniqueUserIds = new Set();
  comments.forEach((comment) => {
    uniqueUserIds.add(comments.userId);
  });

  return comments;
}
