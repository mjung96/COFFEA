import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Card, Grid, Image, Button, Icon, Label, Form } from 'semantic-ui-react';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

function SinglePost(props) {
    const postId = props.match.params.postId;
    const { user } = useContext(AuthContext);



    const { data: { getPost }} = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })

    let postMarkup;
    if(!getPost) {
        postMarkup = <p>Loading...</p>
    }
    else {
        const { id, body, createdAt, username, comments, likes, likeCount, commentCount, title, summary, imageUrl } = getPost;
        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                            src = {imageUrl}
                            size = "massive"
                            float = "right"
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content> 
                                <Card.Header>
                                    {title}
                                </Card.Header>
                                <Card.Meta>
                                    {username} 
                                </Card.Meta>
                                <Card.Meta>
                                    {moment(createdAt).fromNow()}
                                </Card.Meta>
                                <Card.Description>
                                    {body}
                                </Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton user={user} post={{id, likeCount, likes}}/>
                                <Button
                                    as="div"   
                                    labelPosition="right" 
                                    onClick={() => console.log('Comment on post')}
                                    >
                                        <Button basic color="black">
                                            <Icon name="comment"/>
                                        </Button>
                                        <Label basic color="black" pointing="left">
                                            {commentCount}
                                        </Label>
                                </Button>
                                {user && user.username === username && (
                                    <DeleteButton postId={id}/>
                                )}
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
    return postMarkup;
}

const FETCH_POST_QUERY = gql`
    query($postId: ID!) {
        getPost(postId: $postId) {
            id
            body
            title 
            summary 
            imageUrl 
            createdAt 
            username 
            likeCount 
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
`

export default SinglePost