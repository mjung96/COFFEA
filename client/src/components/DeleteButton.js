import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { Button, Icon, Confirm } from 'semantic-ui-react';

import Home from '../pages/Home';

function DeleteButton({ postId, callback, commentId }) {

    const [confirmOpen, open] = useState(false);

    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

    const [deletePostorMutation] = useMutation(mutation, {
        update(){
            //open(false);
            if(callback) callback();
            window.location.reload(true);

        },
        variables: {
            postId,
            commentId
        }
    });

    return (
        <>
        <Button 
            as="div" 
            color="red" 
            floated="right" 
            onClick={deletePostorMutation}>
            {/* onClick={() => open(true)}> */}
            <Icon name ="trash" style={{ margin: 0 }}/>
        </Button>
        {/* <Confirm
            open={confirmOpen}
            onCancel={() => open(false)}
            onConfirm={deletePost}
        /> */}
        </>
    )

}

const DELETE_POST_MUTATION = gql `
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }    
`;

const DELETE_COMMENT_MUTATION = gql `
    mutation deleteComment($postId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId, commentId: $commentId) {
            id
            comments {
                id
                username 
                createdAt 
                body
            }
            commentCount
        }
    }
`

export default DeleteButton