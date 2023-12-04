import React, {useEffect} from 'react';
import './App.css';
import {Header} from './app/ui/Header';
import {Login} from './features/auth/ui/login/Login';
import {useAppDispatch, useAppSelector} from './app/model/store';
import {authThunks} from './features/auth/model/authSlice';
import {CircularProgress} from '@mui/material';
import {ProductsList} from './features/ProductsList/ui/ProductsList';

export type ProductType = {
    description: string
    id: string
    photo: string
    price: number
    title: string
}

function App() {

    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const isInitialized = useAppSelector((state) => state.app.isInitialized);

    const dispatch = useAppDispatch()

    useEffect(() => {
        const checkStatus = async () => {
            await dispatch(authThunks.checkAuthStatus({}));
        }
        checkStatus()
    }, []);


    if (!isInitialized) {
        return <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
            <CircularProgress />
        </div>
    }

    return (
        <>
            <Header/>
            {!isLoggedIn ?
                <Login/>
                :
               <ProductsList />
            }
        </>
    );
}

export default App;