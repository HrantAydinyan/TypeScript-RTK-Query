import { postAPI } from './../services/PostService';
import { postAPIOld } from '../services/OldPostService';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/UserSlice';
import authReducer from './reducers/AuthSlice';
import { authAPI } from '../services/AuthService';

const rootReducer = combineReducers({
    userReducer,
    auth: authReducer,
    [postAPIOld.reducerPath]: postAPIOld.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [postAPI.reducerPath]: postAPI.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postAPIOld.middleware),
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
