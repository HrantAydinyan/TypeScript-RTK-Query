import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/redux';
import { IPost } from '../models/IPost';
import { postAPIOld } from '../services/OldPostService';
import PostItem from './PostItem';

const PostContainer = () => {
    // const { data: posts, error, isLoading, refetch } = postAPIOld.useFetchAllUsersQuery(100);
    // const [createPost, {}] = postAPIOld.useCreatePostMutation();
    // const [updatePost, { isLoading: createIsLoading, error: createError }] =
    //     postAPIOld.useUpdatePostMutation();
    // const [deletePost, {}] = postAPIOld.useDeletePostMutation();
    // const postReducer = useAppSelector((state) => state.postAPIOld);
    // console.log(postReducer);
    // const handleCreate = async () => {
    //     const title = prompt();
    //     await createPost({ title, body: title } as IPost);
    // };
    // const handleRemove = (post: IPost) => {
    //     deletePost(post);
    // };
    // const handleUpdate = async (post: IPost) => {
    //     updatePost(post);
    // };
    // console.log(createIsLoading);
    // return (
    //     <div>
    //         <div className="post__list">
    //             <button onClick={() => refetch()}>Refetch</button>{' '}
    //             {isLoading && <h1>LOADING...</h1>}
    //             {error && <h2>{error}</h2>}
    //             <button onClick={handleCreate}>Cretae</button>
    //             {posts?.map((post) => (
    //                 <PostItem
    //                     key={post.id}
    //                     post={post}
    //                     remove={handleRemove}
    //                     update={handleUpdate}
    //                 />
    //             ))}
    //         </div>
    //     </div>
    // );
};

export default PostContainer;
