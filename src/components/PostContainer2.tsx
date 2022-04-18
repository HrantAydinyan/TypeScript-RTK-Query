import React from 'react';
import { postAPIOld } from '../services/OldPostService';
import PostItem from './PostItem';

const PostContainer = () => {
    const { data: posts } = postAPIOld.useFetchAllUsersQuery(100);

    return (
        <div>
            <div className="post__list">
                {/* {posts?.map(post => <PostItem key={post.id} post={post} />)} */}
            </div>
        </div>
    );
};

export default PostContainer;
