const categories = require('./categories')

const getAllCategories = async (req, res) =>{
    const data = await categories.find()
    res.send({data})
}
module.exports = {getAllCategories}