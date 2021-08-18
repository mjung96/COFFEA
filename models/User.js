const { model, Schema } = require('mongoose');

//schema for User model
const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String
});

module.exports = model('User', userSchema);