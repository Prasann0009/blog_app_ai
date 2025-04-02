import { Router } from "express";
import { authenticateMiddleware } from "../auth/jwtManager.js";
import {
  addCommentController,
  fetchAllCommentsController,
} from "../comment/CommentController.js";

const router = Router();
router.use(authenticateMiddleware);

//add a new comment to the post
router.post("/add", addCommentController);

//fetch all comments of a post
router.get("/all", fetchAllCommentsController);
export default router;
