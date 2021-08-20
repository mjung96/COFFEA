import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { Button, Icon, Confirm } from 'semantic-ui-react';

function DeleteButton({ postId }) {

    const [confirmOpen, open] = useState(false);

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update(){
            //open(false);
            window.location.reload(true);
        },
        variables: {
            postId
        }
    });

    return (
        <>
        <Button 
            as="div" 
            color="red" 
            floated="right" 
            onClick={deletePost}>
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
`

export default DeleteButton