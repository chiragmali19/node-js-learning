import {Router} from "express";
import { createPost, getPosts, updatePost, deletePost } from "../controllers/post.controller.js";

const router = Router();

router.route("/create").post(createPost); // Route for creating a new post
router.route("/getposts").get(getPosts); // Route for getting all posts
router.route("/update/:id").patch(updatePost); // Route for updating a post by id
router.route("/delete/:id").delete(deletePost); // Route for deleting a post by id

export default router;