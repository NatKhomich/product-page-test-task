import React from 'react';
import {Paper} from '@mui/material';
import {Navigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../app/model/store';
import styles from './Basket.module.css';
import {BasketForm} from './BasketForm';
import Button from '@mui/material/Button';
import {basketProductActions} from '../model/basketProductSlice';

export const Basket = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const basketItems = useAppSelector((state) => state.basket.items);
    const products = useAppSelector((state) => state.basket.productList);
    const total = useAppSelector((state) => state.basket.total);

    const dispatch = useAppDispatch()

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>;
    }

    const decreaseQuantity = (id: string) => {
        dispatch(basketProductActions.decreaseQuantity({id}));
    };

    const increaseQuantity = (id: string) => {
        dispatch(basketProductActions.increaseQuantity({id}));
    };

    return (
        <div className={styles.container}>
            {basketItems.map(item => {
                const product = products.find((p) => p.id === item.id);

                return (
                    <Paper sx={{maxWidth: '400px', height: '200px', padding: '20px'}}>
                        {product && (
                            <div className={styles.product}>
                                <img className={styles.productPhoto} src={product.photo} alt="photo"/>
                                <div className={styles.titlePrice}>
                                    <h3 className={styles.title}>{product.title}</h3>
                                    <p className={styles.price}>Price: {product.price} руб</p>
                                    <p className={styles.price}>Quantity: {item.quantity} </p>
                                </div>

                                <Button sx={{height: '40px'}} variant="outlined"
                                        onClick={() => decreaseQuantity(item.id)}>
                                    -
                                </Button>

                                <Button sx={{height: '40px'}} variant="outlined"
                                        onClick={() => increaseQuantity(item.id)}>
                                    +
                                </Button>
                            </div>
                        )}
                    </Paper>
                );
            })}
            <div>
                {total > 0 ? <BasketForm/> : <div> Your shopping cart is empty </div>}
            </div>

            {total > 0 && <p>Total Price: {total} руб</p>}
        </div>
    )
}
