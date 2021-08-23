import React, { useContext } from 'react';
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

    //let postId = useParams(); 

    const { data } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    });

    //const { data } = useQuery(FETCH_POST_QUERY)

    let postMarkup;
    if(!data) {
        postMarkup = <p>Loading...</p>
    }
    else {
        const { id, body, createdAt, username, comments, likes, likeCount, commentCount, title, summary, imageUrl } = data.getPost;
        postMarkup = (

            <Item.Group>
                <Item>
                    <Item.Image
                        src = {imageUrl}
                        size = "medium"
                    />
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
                                     <DeleteButton postId={id}/>
                                 )}
                        </Item.Extra>
                    </Item.Content>
                </Item>
            </Item.Group>

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
