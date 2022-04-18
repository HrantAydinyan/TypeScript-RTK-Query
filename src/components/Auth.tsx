import React, { FC, useCallback, useEffect } from 'react';
import { useAppDispatch } from '../hooks/redux';
import { authAPI } from '../services/AuthService';
import { authSlice } from '../store/reducers/AuthSlice';

const Auth: FC = () => {
    const { data: user } = authAPI.useGetUserQuery();
    const dispatch = useAppDispatch();

    const handleAuth = useCallback(() => {
        if (user) {
            dispatch(authSlice.actions.getUser(user));
        }
    }, [user]);

    useEffect(() => handleAuth(), [handleAuth]);

    return null;
};

export default Auth;
