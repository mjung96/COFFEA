import React, { useContext } from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes, title, imageUrl, summary }}) {

    const { user } = useContext(AuthContext);
    
    // function likePost() {
    //     console.log('Like Post')
    // }

    // function commentOnPost() {
    //     console.log('Comment on Post')
    // }

    return (
        <Card fluid>
            <Card.Content>
              <Image
               floated="right"
               size="small"
               src={imageUrl}
               //src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Cappuccino_at_Sightglass_Coffee.jpg/640px-Cappuccino_at_Sightglass_Coffee.jpg"
              />
             <Card.Header as={Link} to={`/posts/${id}`}>{title}</Card.Header>
             <Card.Meta>{username}</Card.Meta>
             <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
             <Card.Description>
              {summary}
             </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }}/>
                {/* <Button as='div' labelPosition='right' onClick={likePost}>
                    <Button color='brown' basic>
                        <Icon name='heart' />
                    </Button>
                    <Label basic color='brown' pointing='left'>
                        {likeCount}
                    </Label>
                </Button> */}
                <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
                    <Button color='black' basic>
                        <Icon name='comment' />
                    </Button>
                    <Label basic color='black' pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
                {user && user.username === username && <DeleteButton postId={id} />

                    // <Button as="div" color="red" floated="right" onClick={() => console.log('Delete post')}>
                    //     <Icon name ="trash" style={{ margin: 0 }}/>
                    // </Button>
                }
            </Card.Content>
        </Card>
    );
}

export default PostCard