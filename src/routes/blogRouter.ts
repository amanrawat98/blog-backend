import express from "express";
import { createBlog, getAllBlogs, getBlogById, updateBlog, updateBlogStatus } from "../controllers/blog.controller";
import { verifyJwtToken } from "../utility/generateJwtToken";
import { authorizeRole } from "../middleware/checkRole";
import upload from "../config/multerConfig";

const router = express.Router();

router.post("/blog", verifyJwtToken, authorizeRole("author"), upload.single('image'),createBlog);
router.put("/blog/:id", verifyJwtToken, authorizeRole("author"), upload.single('image'),updateBlog);
router.get("/blog", getAllBlogs);
router.get("/blog/:id", getBlogById);
router.put("/blog/:id/:status", verifyJwtToken, authorizeRole("admin"), updateBlogStatus);

export default router;
