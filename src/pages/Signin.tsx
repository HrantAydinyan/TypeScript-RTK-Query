import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import { FormikProvider, useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { signinSchema } from '../validations/';
import Field from '../components/shared/fields/Field';
import { authAPI } from '../services/AuthService';
import { ISignInValue } from '../models/signin';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { authSlice } from '../store/reducers/AuthSlice';

const SignIn: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const [signIn, { data, error, isLoading }] = authAPI.useSigninMutation();

    useEffect(() => {
        if (error && 'data' in error) {
            alert(JSON.stringify(error.data));
        }

        if (data) {
            localStorage.setItem('access', data.token.access);
            localStorage.setItem('refresh', data.token.refresh);
            dispatch(authSlice.actions.signin(data.user));
            navigate('/');
        }
    }, [data, error, dispatch, navigate]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        } as ISignInValue,
        validationSchema: signinSchema,
        onSubmit: (values) => {
            signIn(values);
        },
    });

    return (
        <Box className="signin-container">
            <Box className="signin-content">
                <h3 className="signin-title">Sign In</h3>
                <form onSubmit={formik.handleSubmit}>
                    <FormikProvider value={formik}>
                        <Grid className="signin-fields" container>
                            <Grid item md={12} xs={12}>
                                <Field
                                    type="email"
                                    className="signin-fields-item"
                                    placeholder="Email"
                                    {...formik.getFieldProps('email')}
                                />
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <Field
                                    type="password"
                                    className="signin-fields-item"
                                    placeholder="Password"
                                    {...formik.getFieldProps('password')}
                                />
                            </Grid>
                        </Grid>
                        <Box className="signin-submit">
                            <button type="submit" disabled={isLoading}>
                                Sign In
                            </button>
                        </Box>
                    </FormikProvider>
                </form>
                <Box className="signin-footer">
                    Already have an account?
                    <Link to="/signup">Sign Up</Link>
                </Box>
            </Box>
        </Box>
    );
};

export default SignIn;
