import { addComment, fetchAllCommentsbyPostId } from "./CommentService.js";

export async function addCommentController(req, res) {
  //endpoint POST /comment/add?postId=123456
  const { postId } = req.query;
  const { comment } = req.body;

  if (!postId) {
    return res
      .status(400)
      .json({ message: "Don't allow to comment Invalid Post" });
  }

  if (!comment?.trim()) {
    return res.status(400).json({ message: "Please enter comment" });
  }

  const userId = req.userId;
  const statusCode = await addComment(comment.trim(), userId, postId);
  res.status(statusCode).json({
    message:
      statusCode === 201
        ? "Comment added successfully"
        : statusCode === 400
        ? "Invalid Blog"
        : "Internal Server Error",
  });
}

export async function fetchAllCommentsController(req, res) {
  const { postId } = req.query;

  if (!postId) {
    return res
      .status(400)
      .json({ message: "Don't allow to comment Invalid Post" });
  }
  const response = await fetchAllCommentsbyPostId(postId);
  res.status(200).json(response);
}
