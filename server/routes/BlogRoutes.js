import { Router } from "express";
import { authenticateMiddleware } from "../auth/JwtManager.js";
import {
  createBlogController,
  fetchAllBlogsController,
} from "../blog/BlogController.js";

const router = Router();
router.use(authenticateMiddleware);
/*
 * Creates a new POST
 * Only authenticated users can access it.
 */

router.post("/create", createBlogController);
router.get("/all", fetchAllBlogsController);

export default router;
