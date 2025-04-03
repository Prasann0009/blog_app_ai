import Blog from "../models/BlogModel.js";
import User from "../models/UserModel.js";

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
  try {
    const { comments } = await Blog.findById(postId, {
      comments: 1,
    });

    const uniqueIdNameMap = new Map();

    comments.forEach((comment) => {
      uniqueIdNameMap.set(comment.userId.toString(), "");
    });

    const uniqueUserIds = uniqueIdNameMap.keys();

    const users = await User.find(
      { _id: { $in: [...uniqueUserIds] } },
      { _id: 1, name: 1 }
    );

    users.forEach((user) => {
      uniqueIdNameMap.set(user._id.toString(), user.name);
    });

    const commentsResponse = [];

    comments.forEach((comment) => {
      const commentResponse = {
        comment: comment.text,
        createdAt: comment.createdAt,
        username: uniqueIdNameMap.get(comment.userId) ?? "Anonymous",
      };
      commentsResponse.push(commentResponse);
    });
    return {
      message: "Comments fetched successfully",
      comments: commentsResponse,
    };
  } catch (error) {
    return {
      message: error.message,
    };
  }
}
