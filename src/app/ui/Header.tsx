import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {useAppDispatch, useAppSelector} from '../model/store';
import {authThunks} from '../../features/auth/model/authSlice';

export const Header = () => {

    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const dispatch = useAppDispatch()

    const logoutHandler = () => {
        dispatch(authThunks.logout())
    };

    return (
        <AppBar position="static" sx={{ background: '#563c86' }}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Product
                </Typography>
                {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Logout</Button>}
                <AddShoppingCartIcon sx={{cursor: 'pointer', width: '100px'}}/>
            </Toolbar>
        </AppBar>
    );
};

