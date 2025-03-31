import { Router } from "express";
import { authenticateMiddleware } from "../auth/jwtManager.js";
import { createBlogController } from "../blog/BlogController.js";

const router = Router();
router.use(authenticateMiddleware);
/*
 * Creates a new POST
 * Only authenticated users can access it.
 */

router.post("/create", createBlogController);

export default router;
