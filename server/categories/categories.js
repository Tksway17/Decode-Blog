const mongoose = require('mongoose');
const categoriesSchema = new mongoose.Schema({
    name: String,
    key: Number,
})
module.exports = mongoose.model('category', categoriesSchema)
