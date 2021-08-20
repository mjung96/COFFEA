import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../util/hooks';
import { FETCH_POSTS_QUERY } from '../util/graphql';


function PostForm(props) {
    const [errors, setErrors] = useState({});

    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: '',
        summary: '',
        imageUrl: '',
        title: ''
    });

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
          const data = proxy.readQuery({
            query: FETCH_POSTS_QUERY
          });
          data.getPosts = [result.data.createPost, ...data.getPosts];
          proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
          values.body = '';
          values.title = '';
          values.summary = '';
          values.imageUrl = '';
          //props.push('/');
          window.location.reload(true);
        },

        onError(err) {
          setErrors(err.graphQLErrors[0].extensions.errors);
        },
        
      });

    function createPostCallback() {
        if(!createPost()) {
          //window.location.reload(true);
        }
        //window.location.reload(true);
    }

    return (
        <>
          <Form onSubmit={onSubmit}>
            <h2>Post Something!</h2>
            <Form.Field>
              <Form.Input
                placeholder="Title"
                name="title"
                onChange={onChange}
                value={values.title}
                error={error ? true : false}
              />
              <Form.Input
                   placeholder= "Description"
                   name="summary"
                   onChange={onChange}
                   value={values.summary}
                />
                <Form.Input
                   placeholder= "Image URL"
                   name="imageUrl"
                   onChange={onChange}
                   value={values.imageUrl}
                />
                <Form.Input
                   placeholder= "Body"
                   name="body"
                   onChange={onChange}
                   value={values.body}
                   error={error ? true : false}
                />
              <Button type="submit" color="brown" style={{ marginBottom: 20 }}>
                Submit
              </Button>
            </Form.Field>
          </Form>
          {error && (
            <div className="ui error message" style={{ marginBottom: 20 }}>
              <ul className="list">
                <li>{error.ApollError}</li>
                <li>{error.graphQLErrors[0].message}</li>
              </ul>
            </div>
          )}
        </>
      );

    // return (
    //     <Form onSubmit={onSubmit}>
    //        <h2>Share a Recipe!</h2>
    //       <Form.Field>
    //             <Form.Input
    //                placeholder= "Title"
    //                name="title"
    //                onChange={onChange}
    //                value={values.title}
    //                error={error ? true : false}
    //             />
                // <Form.Input
                //    placeholder= "Description"
                //    name="summary"
                //    onChange={onChange}
                //    value={values.summary}
                // />
                // <Form.Input
                //    placeholder= "Image URL"
                //    name="imageUrl"
                //    onChange={onChange}
                //    value={values.imageUrl}
                // />
                // <Form.Input
                //    placeholder= "Recipe"
                //    name="body"
                //    onChange={onChange}
                //    value={values.body}
                //    error={error ? true : false}
                // />
    //            <Button type="submit" color="brown">
    //                Submit
    //            </Button>
    //      </Form.Field>
    //    </Form>
    //    {error && (
    //     <div className="ui error message" style={{ marginBottom: 20 }}>
    //       <ul className="list">
    //         <li>{error.graphQLErrors[0].message}</li>
    //       </ul>
    //     </div>
    //   )}
    // );

}

const CREATE_POST_MUTATION = gql `
    mutation createPost(
        $body: String!
        $summary: String
        $imageUrl: String
        $title: String!) {
            createPost(
                body: $body
                summary: $summary
                imageUrl: $imageUrl
                title: $title 
            ) {
                id
                body
                title
                createdAt 
                username 
                summary 
                imageUrl 
                likes {
                    id 
                    username 
                    createdAt
                }
                likeCount
                comments {
                    id 
                    body 
                    username 
                    createdAt 
                }
                commentCount 
            }
    }
`;

export default PostForm