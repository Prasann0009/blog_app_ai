import { Router } from "express";
import { authenticateMiddleware } from "../auth/JwtManager.js";
import {
  addCommentController,
  getAllCommentsController,
} from "../comment/CommentController.js";

const router = Router();
router.use(authenticateMiddleware);

//add a new comment to the post
router.post("/add", addCommentController);

//fetch all comments of a post
router.get("/all", getAllCommentsController);
export default router;
