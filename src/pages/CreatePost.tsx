import React, { FC, useEffect } from 'react';
import { postAPI } from '../services/PostService';
import { useNavigate } from 'react-router-dom';
import PostFields from '../components/shared/postFields';

const CreatePost: FC = () => {
    const [createPost, { data, isError, error, isLoading }] = postAPI.useCreatePostMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isError && error) alert('Something went wrong, Try again');

        if (data) {
            navigate('/');
        }
    }, [data, isError, error, navigate]);

    return (
        <PostFields
            onSubmitAction={createPost}
            isLoading={isLoading}
            defaultValues={null}
            isCreate={true}
        />
    );
};

export default CreatePost;
