import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql` 
{
    getPosts {
        id 
        title
        body 
        imageUrl
        createdAt 
        username 
        likeCount
        summary
        likes {
            username
        }
        commentCount
        comments {
            id 
            username 
            createdAt 
            body
        }
    }
}
`;