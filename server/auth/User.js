
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    email: String,
    full_name: String,
    password: String,
    githubId: String,
    isAdmin: {
        type: Boolean,
        default: true 
    }
});

module.exports = mongoose.model('user', UserSchema);
