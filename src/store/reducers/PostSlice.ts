import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPostInitial } from './../../models/IPosts';

export const initialState: IPostInitial = {
    posts: null,
};

export const authSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // signin(state, action: PayloadAction<IAuthUser>) {
        //     state.user = action.payload;
        //     state.isLogedIn = true;
        // },
        // getUser(state, action: PayloadAction<IAuthUser>) {
        //     state.user = action.payload;
        // },
        // logout(state) {
        //     state.isLogedIn = false;
        //     state.user = null;
        // },
    },
});

export default authSlice.reducer;
