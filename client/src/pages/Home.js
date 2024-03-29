import React, {useContext} from 'react';
import { fromPromise, useQuery } from '@apollo/client';
import { Grid } from 'semantic-ui-react';
import PostCard from '../components/PostCard';
import { AuthContext } from '../context/auth';

import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';
import { Transition } from 'semantic-ui-react';

function Home() {
    const{ user} = useContext(AuthContext);
    const {
        loading,
        data : { getPosts: posts } = {}
    } = useQuery(FETCH_POSTS_QUERY);

    console.log("home log");

    return (
                <Grid columns={3}>
                    <Grid.Row className='page-title'>
                        <h1>Recent Posts</h1>
                    </Grid.Row>
                    <Grid.Row>
                        {user && (
                            <Grid.Column>
                                <PostForm/>
                            </Grid.Column>
                        )}
                        {loading ? (
                            <h1>Loading Posts..</h1>
                        ) : (
                            <Transition.Group>
                                {
                                    posts && posts.map((post) => (
                                        <Grid.Column key={post.id}>
                                            <PostCard post={post} />
                                        </Grid.Column>
                                    ))
                                }
                            </Transition.Group>
                        )}
                    </Grid.Row>
                </Grid>
    );
}



export default Home;