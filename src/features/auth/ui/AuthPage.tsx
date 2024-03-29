import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import {Login} from './login/Login';
import {Register} from './register/Register';

export const AuthPage = () => {
    const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

    const toggleForm = () => {
        setIsLoginFormVisible(!isLoginFormVisible);
    };

    return (
        <Grid container justifyContent={'center'} position={'relative'}>
            {isLoginFormVisible ? <Login /> : <Register />}
            <Button variant={'contained'} sx={{ position: 'absolute', bottom: '-60px', height: '50px' }}
                    color={'success'}
                    onClick={toggleForm}>
                {isLoginFormVisible ? 'Create a new account' : 'Back to Login'}
            </Button>
        </Grid>
    );
};