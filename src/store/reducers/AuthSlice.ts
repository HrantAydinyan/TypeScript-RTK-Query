import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuth, IAuthUser } from '../../models/IAuthUser';

export const initialState: IAuth = {
    user: null,
    isLogedIn: localStorage.getItem('access') ? true : false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signin(state, action: PayloadAction<IAuthUser>) {
            state.user = action.payload;
            state.isLogedIn = true;
        },
        getUser(state, action: PayloadAction<IAuthUser>) {
            state.user = action.payload;
        },
        logout(state) {
            state.isLogedIn = false;
            state.user = null;
        },
    },
});

export default authSlice.reducer;
