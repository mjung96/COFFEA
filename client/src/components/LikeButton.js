import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Label, Icon } from 'semantic-ui-react';

function LikeButton({ user, post: { id, likeCount, likes }}) {
    const [liked, setLiked] = useState(false);
    useEffect(() => {
        if (user && likes.find(like => like.username === user.username)) {
            setLiked(true)
        }
        else {
            setLiked(false)
        }
    }, [user, likes]);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id}
    });

        liked ? (
            <Button color='brown'>
                <Icon name='heart' />
            </Button>
        ) : (
            <Button color='brown' basic>
                    <Icon name='heart' />
            </Button>
        )
    ) : (
        <Button color='brown' basic as={Link} to="/login">
                        <Icon name='heart' />
                    </Button>
    );

    

    return (
        <Button as="div" labelPosition="right" onClick={likePost}>
                    {likeButton}
                    {/* <Button color='brown' basic>
                        <Icon name='heart' />
                    </Button> */}
                    <Label basic color='brown' pointing='left'>
                        {likeCount}
                    </Label>
                </Button>
    );
}

const LIKE_POST_MUTATION = gql `
    mutation likePost($postId: ID!) {
        likePost(postId: $postId) {
            id
            likes {
                id
                username 
            }
            likeCount 
        }
    }
`

export default LikeButton