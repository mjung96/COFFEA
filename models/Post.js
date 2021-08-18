const { model, Schema } = require('mongoose');

//schema for Post model 
const postSchema = new Schema({
    body: String,
    title: String,
    summary: String,
    imageUrl: String,
    username: String,
    createdAt: String,
    comments: [{
        body: String,
        username: String,
        createdAt: String
    }],
    likes: [{
        username: String,
        createdAt: String
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('Post', postSchema);