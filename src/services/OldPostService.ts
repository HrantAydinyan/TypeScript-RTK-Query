import { IPost } from '../models/IPost';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IPostResponse } from '../models/IPosts';
import { baseQueryWithReauth } from './util';

const baseUrl = process.env.REACT_APP_JSON_SERVER;
export const postAPIOld = createApi({
    reducerPath: 'postAPIOld',
    // baseQuery: fetchBaseQuery({ baseUrl }),
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Post1'],
    endpoints: (build) => ({
        getPosts: build.query<IPostResponse, number>({
            query: (offset = 0) => ({
                url: '/api/post/crud/',
                params: {
                    limit: 10,
                    offset,
                },
            }),
            providesTags: () => ['Post1'],
        }),
        editPost: build.mutation({
            query: ({ post, postId }) => ({
                url: `/api/post/crud/${postId}/`,
                method: 'PUT',
                body: post,
            }),
            invalidatesTags: ['Post1'],
        }),
        fetchAllUsers: build.query<IPost[], number>({
            query: (limit = 5) => ({
                url: '/posts',
                params: {
                    _limit: limit,
                },
            }),
            // providesTags: () => ['Post1'],
        }),
        createPost: build.mutation({
            query: (post) => ({
                url: '/posts',
                method: 'POST',
                body: post,
            }),
            // invalidatesTags: ['Post1'],
        }),
        updatePost: build.mutation({
            query: (post) => ({
                url: `/posts/${post.id}`,
                method: 'PUT',
                body: post,
            }),
            // invalidatesTags: ['Post1'],
        }),
        deletePost: build.mutation({
            query: (post) => ({
                url: `/posts/${post.id}`,
                method: 'DELETE',
            }),
            // invalidatesTags: ['Post1'],
        }),
    }),
});
