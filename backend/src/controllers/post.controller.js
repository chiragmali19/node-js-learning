import { Post } from "../models/post.model.js";

// create a new post
const createPost = async (req, res) => {
    try {
        const { name, description, age } = req.body;

        if (!name || !description || !age) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newPost = await Post.create({
            name,
            description,
            age,
        });

        res.status(201).json({ message: "Post created successfully", post: newPost });

    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Server error" });
    }
}

// get all posts
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({ posts });
    }
    catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Server error" });
    }
}

// update a post
const updatePost = async (req, res) => {
    try {
        const { id } = req.params;

        // basic validation to check if the body is not empty

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Request body is empty" });
        };

        const { name, description, age } = req.body;
        const updatedPost = await Post.findByIdAndUpdate(id, { name, description, age }, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json({ message: "Post updated successfully", post: updatedPost });
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ message: "Server error" });
    }
}

// delete a post
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json({ message: "Post deleted successfully", post: deletedPost });

    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export { createPost, getPosts, updatePost, deletePost };