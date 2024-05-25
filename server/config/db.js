const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/decodeblog').then(() => {
    console.log('Conneccted to MongoDB');
}).catch((e) => {
    console.log('Failed to connect to MongoDB');
})