import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

const baseUrl = process.env.REACT_APP_BASE_URL;
let subscribers: any[] = [];
let isAlreadyFetchingAccessToken = false;

export const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
        const token: string | null = localStorage.getItem('access');

        if (token) {
            headers.set('Authorization', `JWT ${token}`);
        }

        return headers;
    },
});

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    // if (result.error && result.error.status === 401) {
    // try to get a new token
    //     result = await baseQuery(args, api, extraOptions);
    // const refreshResult = await baseQuery('/api/user/refresh/', api, extraOptions);

    const refresh_token: string | null = localStorage.getItem('refresh');

    if (refresh_token) {
        if (!isAlreadyFetchingAccessToken) await getAccessToken(refresh_token);

        const retryOriginalRequest: any = new Promise((resolve) => {
            addSubscriber((accessToken: string) => {
                // originalRequest.headers.Authorization = 'Bearer ' + accessToken;
                console.log('1111111');
                resolve(baseQuery(args, api, extraOptions));
            });
        });
        return retryOriginalRequest;
    }
    // }
    return result;
};

function onAccessTokenFetched(accessToken: string) {
    subscribers = subscribers.filter((callback) => callback(accessToken));
}

function addSubscriber(callback: any) {
    subscribers.push(callback);
}

async function getAccessToken(refresh: string) {
    isAlreadyFetchingAccessToken = true;
    return fetch(`${baseUrl}/api/user/refresh/`, {
        method: 'POST',
        body: JSON.stringify({ refresh }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then((response: any) => {
            isAlreadyFetchingAccessToken = false;
            console.log(response);
            const accessToken = response?.access;
            const refreshToken = response?.refresh;
            localStorage.setItem('access', accessToken);
            localStorage.setItem('refresh', refreshToken);
            onAccessTokenFetched(accessToken);
            subscribers = [];
        });
}
