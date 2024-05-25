const express = require('express')
const router = express.Router();
const categories = require('../categories/categories')
const User = require('../auth/User')
const Blog = require('../Blogs/Blog')
const Comment = require('../Comments/Comments')

router.get('/', async (req, res) => {
    const options = {}
    const categs = await categories.findOne({ key: req.query.categ })
    if (categs) {
        options.category = categs._id
        res.locals.categ = req.query.categ
    }
    let page = 0
    const limit = 2
    if (req.query.page && req.query.page > 0) {
        page = req.query.page
    }
    if (req.query.search && req.query.search.length > 0) {
        options.$or = [
            {
                title: new RegExp(req.query.search, 'i')
            },
            {
                blogDescription: new RegExp(req.query.search, 'i')
            }
        ]
        res.locals.search = req.query.search
    }
    const comments = await Comment.find({ blogId: req.params.id }).populate('authorId')
    const totalBlogs = await Blog.countDocuments(options)
    const allCategories = await categories.find()
    const blogs = await Blog.find(options).limit(limit).skip(page * limit).populate('category').populate('author')
    res.render("index", { categories: allCategories, user: req.user ? req.user : {}, blogs, pages: Math.ceil(totalBlogs / limit) })
})

router.get('/profile/:id', async (req, res) => {
    const allCategories = await categories.find()
    const blogs = await Blog.find().populate('category').populate('author')
    const user = await User.findById(req.params.id)
    if (user) {
        res.render("blog", { categories: allCategories, user: user, loginUser: req.user, blogs })
    } else {
        res.redirect('/not-found')
    }
})

router.get('/admin/:id', async (req, res) => {
    const allCategories = await categories.find();
    const user = await User.findById(req.params.id);
    if (req.user && req.user._id.toString() === req.params.id) {
        const blogs = await Blog.find({ author: req.user._id }).populate('category').populate('author');
        res.render("adminProfile", { categories: allCategories, loginUser: req.user, user: user, blogs: blogs });
    } else {
        res.redirect('/noauthorization');
    }
})

router.get('/comments/:id', async (req, res) => {
    const allCategories = await categories.find()
    const comments = await Comment.find({ blogId: req.params.id }).populate('authorId')
    console.log(comments);
    const user = await User.findById(req.params.id)
    const blog = await Blog.findById(req.params.id).populate('category').populate('author')
    res.render("comments", { user: req.user ? req.user : {}, blog: blog, categories: allCategories, comments: comments })
})

router.get('/noauthorization', (req, res) => {
    res.render("noauthorization")
})

router.get('/newblog', async (req, res) => {
    const allCategories = await categories.find()
    res.render("newblog", { categories: allCategories, user: req.user ? req.user : {} })
})

router.get('/login', (req, res) => {
    res.render("login", { user: req.user ? req.user : {} })
})

router.get('/register', (req, res) => {
    res.render("register", { user: req.user ? req.user : {} })
})

router.get('/not-found', (req, res) => {
    res.render("notFound")
})

router.get('/edit/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    const allCategories = await categories.find()
    res.render("edit", { categories: allCategories, user: req.user ? req.user : {}, blog })
})

router.get('/blogs', async (req, res) => {
    const options = {}
    if (req.query.author) {
        options.author = req.query.author
    }
    const allCategories = await categories.find()
    const totalBlogs = await Blog.countDocuments(options)
    const limit = 2
    let page = 0
    if (req.query.page && req.query.page > 0) {
        page = req.query.page
    }
    const blogs = await Blog.find(options)
                           .limit(limit)
                           .skip(page * limit)
                           .populate('category')
                           .populate('author') 
    const author = blogs.length > 0 ? blogs[0].author : null; 
    res.render('blogs', { categories: allCategories, user: req.user ? req.user : {}, blogs, pages: Math.ceil(totalBlogs / limit), author: author })
})


module.exports = router
