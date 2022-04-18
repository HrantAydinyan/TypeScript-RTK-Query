import React, { FC } from 'react';
import { Box, Grid, IconButton } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { IPost } from '../../models/IPosts';
import { toShort } from '../../helpers/toShort';

interface IPostProps {
    post: IPost;
}

const Post: FC<IPostProps> = ({ post }) => {
    const { category, description, image, title } = post;
    return (
        <Box className="post">
            <Grid container className="post-content">
                <Grid md={4} xs={4} item className="post-img">
                    <Box className="post-img-container">
                        <img src={image} alt={title} />
                    </Box>
                </Grid>
                <Grid md={8} xs={8} item className="post-info">
                    <Box className="post-info-item">
                        <Grid container>
                            <Grid item md={8}>
                                <div className="post-info-title">Name</div>
                                <div className="post-info-body">{title}</div>
                            </Grid>
                            <Grid item md={4} className="post-actions">
                                <IconButton
                                    // onClick={() => onOpenEditModal(user?.id)}
                                    aria-label="Edit user"
                                    className="post-edit"
                                >
                                    <Edit className="post-edit-icon" />
                                </IconButton>
                                <IconButton
                                    aria-label="Delete user"
                                    // onClick={() => onOpenDeleteModal(user?.id)}
                                    className="post-delete"
                                >
                                    <Delete className="post-delete-icon" />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box className="post-info-item">
                        <div className="post-info-title">Description</div>
                        <div className="post-info-body" title={description}>
                            {toShort(description)}
                        </div>
                    </Box>
                    <Box className="post-info-item">
                        <div className="post-info-title">Category</div>
                        <div className="post-info-body">{category.name}</div>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Post;
