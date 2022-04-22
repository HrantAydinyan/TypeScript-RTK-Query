import React, { ChangeEvent, FC } from 'react';
import { Box, Grid } from '@material-ui/core';
import { FormikProvider, useFormik } from 'formik';
import Field from './fields/Field';
import Image from './Image';
import CategoryDrop from './categoryDropdown';
import { ICreatePost } from '../../models/createPost';
import { cretaePostValidation } from '../../validations/cretaePostValidation';
import { IPostResponseSingle } from '../../models/IPosts';

interface IPostFields {
    isLoading: boolean;
    defaultValues: IPostResponseSingle | null;
    onSubmitAction: (values: FormData) => void;
    isCreate: boolean;
}

const PostFields: FC<IPostFields> = ({ isLoading, defaultValues, onSubmitAction, isCreate }) => {
    const formik = useFormik({
        initialValues: {
            title: defaultValues?.title ?? '',
            description: defaultValues?.description ?? '',
            category: defaultValues?.category?.id ?? 0,
            image: defaultValues?.image ?? null,
        } as ICreatePost,
        validationSchema: cretaePostValidation,
        enableReinitialize: true,
        onSubmit: (values: ICreatePost) => {
            if (!values.image) {
                alert('You need to add Image');
                return;
            }

            const post = new FormData();

            post.append('title', values.title);
            post.append('description', values.description);
            post.append('category', values.category.toString());
            post.append('image', typeof values.image === 'string' ? '' : values.image);
            onSubmitAction(post);
        },
    });

    const onOpenFileInput = (): void => {
        document.getElementById('selectPostImg')?.click();
    };

    const onChangeFile = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files) {
            formik.setFieldValue('image', e?.target?.files[0]);
        }
    };

    const onSetCategory = (value: number): void => {
        formik.setFieldValue('category', value);
    };

    return (
        <Box className="create-post-container">
            <h1>{isCreate ? 'New post' : 'Edit post'}</h1>
            <Box className="create-post-image">
                <span onClick={onOpenFileInput}>
                    <Image file={formik.values.image} type="image" />
                </span>
                <input
                    type="file"
                    onChange={onChangeFile}
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
                                setCategory={onSetCategory}
                                value={formik.values.category}
                            />
                        </Grid>
                    </Grid>
                    <Box className="create-submit">
                        <button type="submit" disabled={isLoading}>
                            {isCreate ? 'Create' : 'Edit'}
                        </button>
                    </Box>
                </FormikProvider>
            </form>
        </Box>
    );
};

export default PostFields;
