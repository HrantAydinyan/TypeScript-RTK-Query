import { IPost } from '../models/IPost';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const postAPIOld = createApi({
    reducerPath: 'postAPIOld',
    baseQuery: fetchBaseQuery({ baseUrl: ' ' }),
    tagTypes: ['Post'],
    endpoints: (build) => ({
        fetchAllUsers: build.query<IPost[], number>({
            query: (limit = 5) => ({
                url: '/posts',
                params: {
                    _limit: limit,
                },
            }),
            providesTags: () => ['Post'],
        }),
        createPost: build.mutation({
            query: (post) => ({
                url: '/posts',
                method: 'POST',
                body: post,
            }),
            invalidatesTags: ['Post'],
        }),
        updatePost: build.mutation({
            query: (post) => ({
                url: `/posts/${post.id}`,
                method: 'PUT',
                body: post,
            }),
            invalidatesTags: ['Post'],
        }),
        deletePost: build.mutation({
            query: (post) => ({
                url: `/posts/${post.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Post'],
        }),
    }),
});
