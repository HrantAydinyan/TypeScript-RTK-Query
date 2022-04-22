import { Box, Button, Grid } from '@material-ui/core';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Post from '../components/elements/Post';
import { IPostResponse } from '../models/IPosts';
import { postAPI } from '../services/PostService';
import { Pagination } from '@material-ui/lab';
import { createBrowserHistory } from 'history';
import { getObjectFromLocationSearch } from '../helpers/getSearchParams';
import DeleteModal from '../components/shared/DeleteModal';
import { postAPIOld } from '../services/OldPostService';

const Home: FC = () => {
    const [offset, setOffset] = useState(0);
    const { data, isLoading, error } = postAPI.useGetPostsQuery(offset);
    const [posts, setPosts] = useState<IPostResponse | null>(null);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    const history = createBrowserHistory();
    const navigate = useNavigate();
    useEffect(() => {
        if (data) {
            setPosts(data);
        }
    }, [data]);

    const pageNumber = useMemo(() => {
        const search = getObjectFromLocationSearch(history.location.search);
        const pageNumber: number = search?.page ?? 1;
        const offset = (pageNumber - 1) * 10;
        setOffset(offset);
        return search?.page ?? 1;
    }, [history.location.search]);

    const defaultPageNumber = useMemo(() => {
        return pageNumber;
    }, []);

    const pagesCount = useMemo(() => {
        const postsCounts: number = posts?.count ?? 0;

        return Math.ceil(postsCounts / 10);
    }, [posts]);

    const onCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    };

    const onOpenDeleteModal = (id: number) => {
        setOpenDeleteModal(true);
        setSelectedUserId(id);
    };

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
                        <Post post={post} onOpenDeleteModal={onOpenDeleteModal} />
                    </Grid>
                ))}
            </Grid>
            <Grid className="home-footer">
                <Box display="flex" justifyContent={'center'} style={{ padding: '20px' }}>
                    <Pagination
                        count={pagesCount}
                        color="secondary"
                        defaultPage={Number(defaultPageNumber)}
                        onChange={(event, value) => navigate(`/posts?page=${value}`)}
                    />
                </Box>
            </Grid>
            <DeleteModal
                open={openDeleteModal}
                onClose={onCloseDeleteModal}
                selectedUserId={selectedUserId}
            />
        </Box>
    );
};

export default Home;
