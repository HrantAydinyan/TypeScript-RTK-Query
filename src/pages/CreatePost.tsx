import React, { ChangeEvent, useEffect } from 'react';
import { Box, Grid } from '@material-ui/core';
import { FormikProvider, useFormik } from 'formik';
import defaultImg from '../assets/images/image 3.jpg';
import Field from '../components/shared/fields/Field';
import Image from '../components/shared/Image';
import CategoryDrop from '../components/shared/categoryDropdown';
import { postAPI } from '../services/PostService';
import { useLocation, useNavigate } from 'react-router-dom';
import { ICreatePost } from '../models/createPost';
import { cretaePostValidation } from '../validations/cretaePostValidation';

const CreatePost = () => {
    const [createPost, { data, isError, error, isLoading }] = postAPI.useCreatePostMutation();
    const navigate = useNavigate();
    const location = useLocation();

    console.log(location);

    useEffect(() => {
        if (isError && error) alert('Something went wrong, Try again');

        if (data) {
            navigate('/');
        }
    }, [data, isError, error]);

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            category: 0,
            image: null,
        } as ICreatePost,
        validationSchema: cretaePostValidation,
        onSubmit: (values) => {
            if (!values.image) {
                alert('You need to add Image');
                return;
            }

            const post = new FormData();

            post.append('title', values.title);
            post.append('description', values.description);
            post.append('category', values.category.toString());
            post.append('image', values.image);
            console.log(values);
            createPost(post);
        },
    });

    const openFileInput = () => {
        document.getElementById('selectPostImg')?.click();
    };

    const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            formik.setFieldValue('image', e?.target?.files[0]);
        }
    };

    const setCategory = (value: number) => {
        formik.setFieldValue('category', value);
    };

    return (
        <Box className="create-post-container">
            <h1>New post</h1>
            <Box className="create-post-image">
                <span onClick={openFileInput}>
                    <Image file={formik.values.image} type="image" />
                </span>
                <input
                    type="file"
                    onChange={handleChangeFile}
                    style={{ display: 'none' }}
                    id="selectPostImg"
                />
            </Box>
            <form onSubmit={formik.handleSubmit}>
                <FormikProvider value={formik}>
                    <Grid className="create-fields" container spacing={1}>
                        <Grid item md={12} xs={12} className="create-fields-item">
                            <Field
                                type="title"
                                placeholder="Name"
                                {...formik.getFieldProps('title')}
                            />
                        </Grid>
                        <Grid item md={12} xs={12} className="create-fields-item">
                            <Field
                                field="input"
                                type="text"
                                multiline={true}
                                minRows={4}
                                placeholder="Description"
                                {...formik.getFieldProps('description')}
                            />
                        </Grid>
                        <Grid item md={12} xs={12} className="create-fields-item">
                            <CategoryDrop
                                setCategory={setCategory}
                                value={formik.values.category}
                            />
                        </Grid>
                    </Grid>
                    <Box className="create-submit">
                        <button type="submit" disabled={isLoading}>
                            Create
                        </button>
                    </Box>
                </FormikProvider>
            </form>
        </Box>
    );
};

export default CreatePost;
