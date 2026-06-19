const express = require("express");
const router = express.Router();
const { getBlogs, getBlogById, createBlog, deleteBlog } = require("../controllers/blogController");
const { protect } = require("../middlewares/authMiddleware");

router.route("/")
    .get(getBlogs)
    .post(protect, createBlog);

router.route("/:id")
    .get(getBlogById)
    .delete(protect, deleteBlog);

module.exports = router;
