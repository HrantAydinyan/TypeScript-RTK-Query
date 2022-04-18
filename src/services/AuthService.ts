import { IAuthUser } from './../models/IAuthUser';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { ISignInValue } from '../models/signin';
import { baseQueryWithReauth } from './util';

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: baseQueryWithReauth,
    endpoints: (build) => ({
        signup: build.mutation({
            query: (body: FormData) => ({
                url: '/api/user/sign-up/',
                method: 'POST',
                body,
            }),
        }),
        signin: build.mutation({
            query: (body: ISignInValue) => ({
                url: '/api/user/sign-in/',
                method: 'POST',
                body,
            }),
        }),
        getUser: build.query<IAuthUser, void>({
            query: () => ({
                url: '/api/user/me/',
            }),
        }),
    }),
});
