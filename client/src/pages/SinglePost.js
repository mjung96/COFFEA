import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Card, Grid, Image, Button, Icon, Label, Form, Item, GridColumn } from 'semantic-ui-react';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

function SinglePost(props) {
    let postId = props.match.params.postId;
    const { user } = useContext(AuthContext);

    const [comment, setComment] = useState('');

    //let postId = useParams(); 

    const { data } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    });

    const[submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update() {
            setComment('');
        },
        variables: {
            postId,
            body: comment
        }
    })

    function deletePostCallback() {
        props.history.push('/')
    }

    //const { data } = useQuery(FETCH_POST_QUERY)

    let postMarkup;
    if(!data) {
        postMarkup = <p>Loading...</p>
    }
    else {
        const { id, body, createdAt, username, comments, likes, likeCount, commentCount, title, summary, imageUrl } = data.getPost;
        postMarkup = (

            <Grid>
                <Grid.Row>
                    <Image 
                        src = {imageUrl}
                        size="medium"
                    />
                </Grid.Row>
                <Grid.Row>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Item.Header>
                                    {title}
                                </Item.Header>
                                <Item.Meta>
                                    {username}, {moment(createdAt).fromNow()}
                                </Item.Meta>
                                <Item.Description>
                                    {body}
                                </Item.Description>
                                <Item.Extra>
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
                                    <DeleteButton postId={id} callback={deletePostCallback}/>
                                    )}
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                        {user && (
                            <Card fluid>
                                <Card.Content>
                                <Form>
                                    <div className="ui action input fluid">
                                        <input
                                            type="text"
                                            placeholder="Comment"
                                            name="comment"
                                            value={comment}
                                            onChange={event => setComment(event.target.value)}
                                        />
                                        <button type="submit"
                                            className="ui button brown"
                                            disabled={comment.trim() === ''}
                                            onClick={submitComment}
                                            >
                                            Submit 
                                        </button>
                                    </div>
                                </Form>
                                </Card.Content>
                            </Card>
                        )}
                        {comments.map(comment => (
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                    {user && user.username === comment.username && (
                                        <DeleteButton postId={id} commentId={comment.id}/>
                                    )}
                                    <Card.Header>
                                        {comment.username}
                                    </Card.Header>
                                    <Card.Meta>
                                        {moment(comment.createdAt).fromNow()}
                                    </Card.Meta>
                                    <Card.Description>
                                        {comment.body}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        ))}
                    </Item.Group>
                </Grid.Row>
            </Grid>

            

            // <Grid centered>
            //     <Grid.Row>
            //         <Image
            //             src = {imageUrl}
            //             size = "large"
            //         />
            //     </Grid.Row>
            //     <Grid.Row>
            //         <Grid.Column>
            //             <Card fluid>
            //                 <Card.Content>
            //                 <Card.Header>
            //                     {title}
            //                 </Card.Header>
            //                 <Card.Meta>
            //                     {username}, {moment(createdAt).fromNow()}
            //                 </Card.Meta>
            //                 <Card.Description>
            //                     {body}
            //                 </Card.Description>
            //                 <Card.Content extra>
            //                      <LikeButton user={user} post={{id, likeCount, likes}}/>
            //                      <Button
            //                          as="div"   
            //                          labelPosition="right" 
            //                          onClick={() => console.log('Comment on post')}
            //                          >
            //                              <Button basic color="black">
            //                                  <Icon name="comment"/>
            //                              </Button>
            //                              <Label basic color="black" pointing="left">
            //                                  {commentCount}
            //                              </Label>
            //                      </Button>
            //                      {user && user.username === username && (
            //                          <DeleteButton postId={id}/>
            //                      )}
            //                  </Card.Content>
            //             </Card.Content>
            //             </Card>
            //         </Grid.Column>
            //     </Grid.Row>
            // </Grid>
        );
    }
    return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql `
    mutation($postId: String!, $body: String!) {
        createComment(postId: $postId, body: $body) {
            id
            comments {
                id
                body
                createdAt 
                username 
            }
            commentCount
        }
    }
`

const FETCH_POST_QUERY = gql`
    query getPost($postId: ID!) {
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
