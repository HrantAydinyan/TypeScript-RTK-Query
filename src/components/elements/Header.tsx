import React, { FC } from 'react';
import { AppBar, Toolbar, Container, Box, Button, Avatar, Grid } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { authSlice } from '../../store/reducers/AuthSlice';

const Header: FC = () => {
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        dispatch(authSlice.actions.logout());
        navigate('/signin');
    };
    return (
        <Box>
            <AppBar position="fixed" className="header">
                <Container maxWidth="xl">
                    <Toolbar disableGutters className="header-toolbar">
                        <ul className="menu">
                            <li>
                                <Grid className="user-info">
                                    <Avatar src={user?.image} alt="user" />
                                    <Box>
                                        {user?.first_name} {user?.last_name}
                                    </Box>
                                </Grid>
                            </li>
                            <li className="">
                                <Button onClick={logout} color="primary" size="large">
                                    Logout
                                </Button>
                            </li>
                        </ul>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
};

export default Header;
