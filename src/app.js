const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

// Root Endpoint
app.get("/", (req, res) => {
    res.send("API is running...");
});

module.exports = app;
