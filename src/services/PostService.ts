import { IPostResponse, ICategory } from './../models/IPosts';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from './util';

export const postAPI = createApi({
    reducerPath: 'postAPI',
    baseQuery: baseQueryWithReauth,
    endpoints: (build) => ({
        getPosts: build.query<IPostResponse, number>({
            query: (limit) => ({
                url: '/api/post/crud/',
            }),
        }),
        getCategories: build.query<ICategory[], void>({
            query: () => ({
                url: '/api/category/',
            }),
        }),
        createPost: build.mutation({
            query: (post: FormData) => ({
                url: '/api/post/crud/',
                method: 'POST',
                body: post,
            }),
        }),
    }),
});
