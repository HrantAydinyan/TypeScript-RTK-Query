import { IPostResponse, ICategory, IPostResponseSingle } from './../models/IPosts';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from './util';

export const postAPI = createApi({
    reducerPath: 'postAPI',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Posts'],
    endpoints: (build) => ({
        getPosts: build.query<IPostResponse, number>({
            query: (offset = 0) => ({
                url: '/api/post/crud/',
                params: {
                    limit: 10,
                    offset,
                },
            }),
            keepUnusedDataFor: 1,
            providesTags: ['Posts'],
        }),
        createPost: build.mutation({
            query: (post: FormData) => ({
                url: '/api/post/crud/',
                method: 'POST',
                body: post,
            }),
            invalidatesTags: ['Posts'],
        }),
        editPost: build.mutation({
            query: ({ post, postId }: { post: FormData; postId: string }) => ({
                url: `/api/post/crud/${postId}/`,
                method: 'PUT',
                body: post,
            }),
            invalidatesTags: ['Posts'],
        }),
        deletePost: build.mutation({
            query: (postId: number) => ({
                url: `/api/post/crud/${postId}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Posts'],
        }),
        getSinglePosts: build.query<IPostResponseSingle, string | undefined>({
            query: (postId) => ({
                url: `/api/post/crud/${postId}/`,
            }),
            keepUnusedDataFor: 1,
        }),
        getCategories: build.query<ICategory[], void>({
            query: () => ({
                url: '/api/category/',
            }),
        }),
    }),
});
