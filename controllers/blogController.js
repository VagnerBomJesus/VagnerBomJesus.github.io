const Blog = require('../models/Blog');

exports.createBlog = async (req, res) => {
    try {
        const blogData = {
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            categories: req.body.categories,
            status: req.body.status,
            image: req.file ? req.file.path : null,
            images: req.files.images ? req.files.images.map(file => file.path) : []
        };
        const blog = await Blog.createBlog(blogData);
        res.status(201).json({ message: "Blog created successfully", blogId: blog.id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.addComment = async (req, res) => {
    try {
        const commentData = {
            commentAuthor: req.body.author,
            text: req.body.text
        };
        const comment = await Blog.addComment(req.params.blogId, commentData);
        res.status(201).json({ message: "Comment added successfully", comment });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};