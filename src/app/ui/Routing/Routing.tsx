import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {ProductsList} from '../../../features/ProductsList/ui/ProductsList';
import {AuthPage} from '../../../features/auth/ui/AuthPage';
import {Basket} from '../../../features/basket/ui/Basket/Basket';

export const Routing = () => {
    return (
        <Routes>
            <Route path={'/'} element={<ProductsList/>}/>
            <Route path={'/login'} element={<AuthPage/>}/>
            <Route path={'/basket'} element={<Basket/>}/>
        </Routes>
    );
};

