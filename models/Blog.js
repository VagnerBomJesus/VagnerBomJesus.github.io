const DataHelper = require('../data/DataHelper.js');
const uuid = require('uuid');

class Blog {
    constructor() {
        this.dataHelper = new DataHelper('blogs.json');
    }

    createBlog({ title, content, author, categories, status }) {
        const blogs = this.dataHelper.readData();
        const newBlog = {
            id: uuid.v4(),
            title,
            content,
            publishedDate: new Date(),
            author,
            categories,
            status: status || 'draft',
            comments: []
        };
        blogs.push(newBlog);
        this.dataHelper.writeData(blogs);
        return newBlog;
    }

    addComment(blogId, { commentAuthor, text }) {
        const blogs = this.dataHelper.readData();
        const blog = blogs.find(b => b.id === blogId);
        if (!blog) throw new Error("Blog not found");

        const comment = {
            id: uuid.v4(),
            commentAuthor,
            text,
            date: new Date()
        };
        blog.comments.push(comment);
        this.dataHelper.writeData(blogs);
        return comment;
    }

    findAll() {
        return this.dataHelper.readData();
    }

    findById(blogId) {
        const blogs = this.dataHelper.readData();
        return blogs.find(b => b.id === blogId);
    }
}

module.exports = new Blog();
