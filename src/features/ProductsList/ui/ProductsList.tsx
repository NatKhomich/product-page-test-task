import React, {useEffect} from 'react';
import {Product} from './Product/Product';
import {Grid, Paper} from '@mui/material';
import {Navigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../app/model/store';
import {basketProductThunks} from '../../basket/model/basketProductSlice';

export const ProductsList = () => {

    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const productList = useAppSelector((state) => state.basket.productList);
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(basketProductThunks.fetchProductList())
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={"/login"} />
    }

    return (
        <div className="lists">
                {productList.map(p => {
                    return (
                        <Grid item key={p.id} className={'product'}>
                            <Paper>
                                <Product item={p}/>
                            </Paper>
                        </Grid>
                    )
                })}
        </div>
    );
};

