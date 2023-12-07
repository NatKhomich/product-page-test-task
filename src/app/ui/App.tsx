import React, {useEffect} from 'react';
import './App.css';
import {Header} from './Header/Header';
import {useAppDispatch, useAppSelector} from '../model/store';
import {authThunks} from '../../features/auth/model/authSlice';
import {CircularProgress, LinearProgress} from '@mui/material';
import {ProductsList} from '../../features/ProductsList/ui/ProductsList';
import {Route, Routes} from 'react-router-dom';
import {Basket} from '../../features/basket/ui/Basket/Basket';
import {AuthPage} from '../../features/auth/ui/AuthPage';
import {ErrorSnackbar} from '../../components/ErrorSnackbar/ErrorSnackbar';

export type ProductType = {
    description: string
    id: string
    photo: string
    price: number
    title: string
}

function App() {

    const status = useAppSelector((state) => state.app.status);
    const isInitialized = useAppSelector((state) => state.app.isInitialized);

    const dispatch = useAppDispatch()

    useEffect(() => {
         dispatch(authThunks.checkAuthStatus({}));
    }, []);


    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <>
            <Header/>
            {status === 'loading' && <LinearProgress color={'primary'}/>}
            <div>
                <Routes>
                    <Route path={'/'} element={<ProductsList/>}/>
                    <Route path={'/login'} element={<AuthPage/>}/>
                    <Route path={'/basket'} element={<Basket/>}/>
                </Routes>
            </div>
            <ErrorSnackbar/>
        </>
    );
}

export default App;