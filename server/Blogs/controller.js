const Blog = require('./Blog');
const User = require('../auth/User')
const fs = require('fs');
const path = require('path');

const createBlog = async (req, res) => {
    if (req.file && req.body.title.length > 2 &&
        req.body.blogDescription.length > 2 &&
        req.body.category.length > 2
    ) {
        await new Blog({
            title: req.body.title,
            blogDescription: req.body.blogDescription,
            category: req.body.category,
            image: `/images/blogs/${req.file.filename}`,
            author: req.user._id
        }).save();
        res.redirect(`/admin/${req.user._id}`);
    } else {
        res.redirect('/newblog?error=1');
    }
}
const editBlog = async (req, res) => {
    if(req.file && req.body.title.length > 2 && 
        req.body.blogDescription.length > 2 &&
        req.body.category.length > 2
        ){
            const blog = await Blog.findById(req.body.id)
            fs.unlinkSync(path.join(__dirname + '../../../public', blog.image))
            blog.title = req.body.title;
            blog.blogDescription = req.body.blogDescription;
            blog.category = req.body.category;
            blog.image = `/images/blogs/${req.file.filename}`;
            blog.save()
            await Blog.findByIdAndUpdate(req.body.id, {
                title: req.body.title,
                blogDescription: req.body.blogDescription,
                category: req.body.category,
                image: `/images/blogs/${req.file.filename}`,
                author: req.user._id
            })
            res.redirect('/admin/' + req.user._id)
        }else{
            res.redirect(`/edit/${req.body.id}?error=1`)
        }
}
const deleteBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if(blog){
        fs.unlinkSync(path.join(__dirname + '../../../public' + blog.image))
        await Blog.deleteOne({_id: req.params.id})
        res.status(200).send('ok')
    }else{
        res.status(404).send('Not found')
    }
}
module.exports = {
    createBlog,
    editBlog,
    deleteBlog
}
