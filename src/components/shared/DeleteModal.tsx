import React, { FC } from 'react';
import { Button, Box, Dialog, Typography } from '@material-ui/core';
import { postAPI } from '../../services/PostService';
// import Preloader from '../preloader';

interface IDeleteModalProps {
    open: boolean;
    onClose: () => void;
    selectedUserId: number | null;
}

const DeleteModal: FC<IDeleteModalProps> = ({ open, onClose, selectedUserId }) => {
    const [deletePost, { data, isLoading, error }] = postAPI.useDeletePostMutation();

    const onConfirm = () => {
        if (selectedUserId) {
            deletePost(selectedUserId);
            onClose();
        }
    };
    return (
        <Dialog open={open} onClose={onClose} scroll="body" className="cancel-popup">
            <Box className="cancel-popup-content">
                <Typography variant="body1" className="title">
                    Delete User
                </Typography>
                <Typography className="desc">Are you sure you want to delete</Typography>
                <Box className="buttons">
                    {isLoading ? (
                        <div>Loading ... </div>
                    ) : (
                        <>
                            <Box mr={1}>
                                <Button color="secondary" onClick={onClose}>
                                    No
                                </Button>
                            </Box>
                            <Box>
                                <Button color="primary" onClick={onConfirm}>
                                    Yes
                                </Button>
                            </Box>
                        </>
                    )}
                </Box>
            </Box>
        </Dialog>
    );
};

export default DeleteModal;
