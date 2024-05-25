
function sendComment(e){
    e.preventDefault()
    const comment_text = document.querySelector('#comment-text').value
    const author = document.querySelector('#comment_author').value
    const blog = document.querySelector('#comment_blog').value

        axios.post('/api/comment' , { authorId: author, blogId: blog, text: comment_text}).then(data => {
            if(data.data){
                location.reload()
            }
        })
}