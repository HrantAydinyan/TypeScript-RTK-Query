import React, { FC, useEffect } from 'react';
import { postAPI } from '../services/PostService';
import { useNavigate, useParams } from 'react-router-dom';
import PostFields from '../components/shared/postFields';

const EditPost: FC = () => {
    const [editPost, { data, isError, error, isLoading }] = postAPI.useEditPostMutation();
    const navigate = useNavigate();
    const params = useParams();
    const { id: postId } = params;

    const { data: singlePost } = postAPI.useGetSinglePostsQuery(postId);
    useEffect(() => {
        if (isError && error) alert('Something went wrong, Try again');

        if (data) {
            navigate('/');
        }
    }, [data, isError, error, navigate]);

    const onEditPost = (post: FormData): void => {
        if (postId) editPost({ post, postId: postId });
    };

    return (
        <PostFields
            onSubmitAction={onEditPost}
            isLoading={isLoading}
            defaultValues={singlePost ?? null}
            isCreate={false}
        />
    );
};

export default EditPost;
