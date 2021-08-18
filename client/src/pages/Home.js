import React, { useContext } from 'react';
//import ReactDOM from 'react-dom';
//import Image from 'react-image-resizer';
import { useQuery } from '@apollo/react-hooks';
import { Grid } from 'semantic-ui-react';

import { AuthContext  } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {
    const { user } = useContext(AuthContext);

    const { data, loading } = useQuery(FETCH_POSTS_QUERY)
 
    return (
        <Grid verticalAlignment='middle' columns={3}>
            {/* <Grid.Row centered columns={1}>
                <h1>COFFEA</h1>
            </Grid.Row> */}
        <Grid.Row>
            {user && (
                <Grid.Column>
                    <PostForm/>
                </Grid.Column>
            )}
            {loading ? (
                <h1>Loading Posts...</h1>
            ) : (
                data.getPosts && data.getPosts.map((post) => (
                    <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                        <PostCard post={post}/>
                    </Grid.Column>
                ))
            )}
        </Grid.Row>
        </Grid>
        // <div>
        //     <h1>COFFEA</h1>
        // </div>
    );
};

export default Home;