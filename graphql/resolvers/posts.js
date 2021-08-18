const { AuthenticationError, UserInputError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find();
                return posts;
            } catch(err) {
                throw new Error(err);
            }
        },

        async getPost(_, { postId }) {
            try {
                const post = await Post.findById(postId);
                if (post) {
                    return post;
                }
                else {
                    throw new Error('Post not found'); // Error message now showing this exact string 
                }
            }
            catch(err) {
                throw new Error(err);
            }
        }
    },

    Mutation: {
        async createPost(_, { title, body, imageUrl, summary }, context) {
            const user = checkAuth(context);
            //console.log(user);

            // if (args.body.trim() === '') {
            //     throw new Error('Post body cannot be empty');
            // }

            // if (args.title.trim() === '') {
            //     throw new Error('Post must have a title');
            // }

            const newPost = new Post({
                title,
                body,
                imageUrl,
                summary,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });

            const post = await newPost.save();

            return post;
        },

        async deletePost(_, { postId }, context) {
            const user = checkAuth(context);
            try{
                const post = await Post.findbyId(postId);
                if(user.username === post.username){
                    await post.delete();
                    return 'Post has been deleted';
                }
                else {
                    throw new AuthenticationError('Action now allowed');
                }
            } catch(err) {
                throw new Error(err);
            }
        },

        async likePost(_, { postId }, context) {
            const { username } = checkAuth(context);
            const post = await Post.findById(postId);
            if (post) {
                if (post.likes.find(like => like.username === username)) {
                    // Post already liked by user, unlike it
                    post.likes = post.likes.filter(like => like.username !== username);
                }
                else {
                    // Post is not liked  by user, like it 
                    post.likes.push({
                        username,
                        createdAt: new Date().toISOString()
                    })
                }
                await post.save();
                return post;
            }
            else throw new UserInputError('Post not found');
        }
    }
};
