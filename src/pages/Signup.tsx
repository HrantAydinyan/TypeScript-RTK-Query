import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import { FormikProvider, useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { signupSchema } from '../validations';
import Field from '../components/shared/fields/Field';
import Image from '../components/shared/Image';
import { authAPI } from '../services/AuthService';
import { IInitialValue } from '../models/signup';

const SignUp: FC = () => {
    const [file, setFile] = useState<Blob | null>(null);
    const [signup, { data, isError, error }] = authAPI.useSignupMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            // console.log('data', error?.data);
        }
        console.log(data);
        if (data) {
            console.log(data);
            navigate;
        }
        console.log('error', error);
    }, [data, isError, error]);

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirm_password: '',
        } as IInitialValue,
        validationSchema: signupSchema,
        onSubmit: (values) => {
            if (!file) {
                alert('You need to add Image');
                return;
            }
            const formData = new FormData();
            formData.append('first_name', values.first_name);
            formData.append('last_name', values.last_name);
            formData.append('email', values.email);
            formData.append('password', values.password);
            formData.append('image', file);

            signup(formData);
        },
    });

    const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e?.target?.files[0]);
        }
    };

    const openFileInput = () => {
        document.getElementById('selectImage')?.click();
    };

    return (
        <Box className="signup-container">
            <Box className="signup-content">
                <h3 className="signup-title">Sign Up</h3>
                <Box className="signup-avatar">
                    <span onClick={openFileInput}>
                        <Image file={file} type="avatar" />
                    </span>
                    <input
                        type="file"
                        onChange={handleChangeFile}
                        style={{ display: 'none' }}
                        id="selectImage"
                    />
                </Box>
                <form onSubmit={formik.handleSubmit}>
                    <FormikProvider value={formik}>
                        <Grid className="signup-fields" container>
                            <Grid item md={6} xs={12} className="form-element">
                                <Field
                                    type="text"
                                    className="signup-fields-item"
                                    placeholder="First Name"
                                    {...formik.getFieldProps('first_name')}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <Field
                                    type="text"
                                    className="signup-fields-item"
                                    placeholder="Last Name"
                                    {...formik.getFieldProps('last_name')}
                                />
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <Field
                                    type="email"
                                    className="signup-fields-item"
                                    placeholder="Email"
                                    {...formik.getFieldProps('email')}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <Field
                                    type="password"
                                    className="signup-fields-item"
                                    placeholder="Password"
                                    {...formik.getFieldProps('password')}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <Field
                                    type="password"
                                    className="signup-fields-item"
                                    placeholder="Confirm Password"
                                    {...formik.getFieldProps('confirm_password')}
                                />
                            </Grid>
                        </Grid>
                        <Box className="signup-submit">
                            <button type="submit">Sign up</button>
                        </Box>
                    </FormikProvider>
                </form>
                <Box className="signup-footer">
                    Already have an account?
                    <Link to="/signin">Log In</Link>
                </Box>
            </Box>
        </Box>
    );
};

export default SignUp;
