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
import {useNavigate} from 'react-router-dom';

export const Header = () => {

    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const total = useAppSelector((state) => state.basket.total);
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(authThunks.logout())
    };

   const openProductHandler = () => {
       navigate('/')
   }

    const openBasketHandler = () => {
        navigate('/basket')
    }

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
                <Typography onClick={openProductHandler} variant="h6" component="div" sx={{ flexGrow: 1 , cursor: 'pointer'}}>
                    Product
                </Typography>
                {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Logout</Button>}

                <div onClick={openBasketHandler} style={{cursor: 'pointer'}}>
                    <AddShoppingCartIcon sx={{width: '100px'}}/>
                    {total > 0 && <div style={{marginLeft: '25px'}}>{total}</div> }
                </div>
            </Toolbar>
        </AppBar>
    );
};

