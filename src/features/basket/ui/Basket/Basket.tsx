import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../../../app/model/store';
import styles from './Basket.module.css';
import {BasketForm} from '../BasketForm';
import {BasketItem} from './BasketItem/BasketItem';

export const Basket = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const basketItems = useAppSelector((state) => state.basket.items);
    const products = useAppSelector((state) => state.basket.productList);
    const total = useAppSelector((state) => state.basket.total);

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>;
    }

    return (
        total > 0 ?
            <div className={styles.container}>
                <div className={styles.productsContainer}>
                    {basketItems.map(item => {
                        const product = products.find((p) => p.id === item.id);
                        return (
                            <div key={item.id} className={styles.product}>
                                {product && <BasketItem product={product} item={item}/>}
                            </div>
                        );
                    })}
                </div>

                <div>
                    <div className={styles.totalAndForm}>
                        <div className={styles.total}>
                            {total > 0 && <p>Total Price: {total} руб</p>}
                        </div>

                        <div className={styles.form}>
                            <BasketForm/>
                        </div>
                    </div>
                </div>

            </div>

            : <div className={styles.emptyBasket}>
                <p className={styles.emptyBasketItem}>Your shopping cart is empty</p>
            </div>

    )
}
