import { Box, Button, Grid } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import Post from '../components/elements/Post';
import { postAPI } from '../services/PostService';

const Home: FC = () => {
    const [limit, setLimit] = useState(1);
    const { data: posts, isLoading, error } = postAPI.useGetPostsQuery(limit);
    console.log(posts);
    return (
        <Box>
            <Grid className="home-title">
                <h1>All Posts</h1>
                <Box className="new-post-btn">
                    <Link to="/post/create">
                        <Button variant="contained" color="primary">
                            New post
                        </Button>
                    </Link>
                </Box>
            </Grid>
            <Grid className="home-body" container spacing={4}>
                {posts?.results?.map((post) => (
                    <Grid item md={6} xs={12} key={post.id}>
                        <Post post={post} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Home;
