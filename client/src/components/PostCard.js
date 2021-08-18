import React from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes, title, imageUrl, summary }}) {

    function likePost() {
        console.log('Like Post')
    }

    function commentOnPost() {
        console.log('Comment on Post')
    }

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
                <Button as='div' labelPosition='right' onClick={likePost}>
                    <Button color='brown' basic>
                        <Icon name='heart' />
                    </Button>
                    <Label basic color='brown' pointing='left'>
                        {likeCount}
                    </Label>
                </Button>
                <Button as='div' labelPosition='right' onClick={commentOnPost}>
                    <Button color='black' basic>
                        <Icon name='comment' />
                    </Button>
                    <Label basic color='black' pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
            </Card.Content>
        </Card>
    );
}

export default PostCard