import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

const baseUrl = process.env.REACT_APP_BASE_URL;

const baseQuery = fetchBaseQuery({
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
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        // try to get a new token
        const refresh_token: string | null = localStorage.getItem('refresh');
        // const refreshResult = await baseQuery('/api/user/refresh/', api, extraOptions);
        if (refresh_token) {
            const refreshResult = await fetch(`${baseUrl}/api/user/refresh/`, {
                method: 'POST',
                body: JSON.stringify({ refresh: refresh_token }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (refreshResult.status === 200) {
                const { access, refresh } = await refreshResult.json();
                localStorage.setItem('access', access);
                localStorage.setItem('refresh', refresh);
                result = await baseQuery(args, api, extraOptions);
            } else {
                // logout
            }

            // if (refreshResult.data) {
            //     // store the new token
            //     // api.dispatch(tokenReceived(refreshResult.data));
            //     // retry the initial query
            // } else {
            //     // api.dispatch(loggedOut());
            // }
        }
    }
    return result;
};
