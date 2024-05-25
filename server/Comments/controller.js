
const Comment = require('./Comments')
const saveComment = async (req, res) => {
    if(req.body.authorId && req.body.blogId)
    await new Comment({
        text: req.body.text,
        blogId: req.body.blogId,
        authorId: req.body.authorId,
        date: Date.now()
    }).save()
    res.status(200).send(true)
}
module.exports = {
    saveComment
}