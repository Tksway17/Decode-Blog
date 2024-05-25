const express = require('express')
const router = express.Router();
const {getAllCategories} = require('./controller')
const writeDataCategory = require('./seed')
router.get('/api/category', getAllCategories)
writeDataCategory()
module.exports = router