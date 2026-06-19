const Blog = require("../models/Blog");

const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate("author", "name email");
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("author", "name email");
        if (blog) {
            res.json(blog);
        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createBlog = async (req, res) => {
    try {
        const { title, image, content } = req.body;
        
        const blog = new Blog({
            title,
            image,
            content,
            author: req.user._id
        });

        const createdBlog = await blog.save();
        res.status(201).json(createdBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        
        if (blog) {
            // Check if the user is the author
            if (blog.author.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: "Not authorized to delete this blog" });
            }
            await blog.deleteOne();
            res.json({ message: "Blog removed" });
        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getBlogs, getBlogById, createBlog, deleteBlog };
