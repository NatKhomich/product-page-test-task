// import {Navigate} from 'react-router-dom';
// import {useAppSelector} from '../../../app/model/store';
//
// type Props = {
//     // product: Partial<ProductType>
// }
//
// export const Basket = () => {
//
//     const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
//
//     if (!isLoggedIn) {
//         return <Navigate to={"/login"} />
//     }
//
//     return (
//         <div>
//             корзина
//             <Grid className={'product'}>
//                 <Paper>
//                     Product
//                 </Paper>
//             </Grid>
//         </div>
//     );
// };
import React from 'react';
import {Paper} from '@mui/material';
import {Navigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../app/model/store';
import styles from './Basket.module.css';
import {BasketForm} from './BasketForm';
import Button from '@mui/material/Button';
import {basketActions} from '../model/basketSlice';

export const Basket = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const basketItems = useAppSelector((state) => state.basket.items);
    const products = useAppSelector((state) => state.product.productList);

    const dispatch = useAppDispatch()

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>;
    }

    const calculateTotalPrice = () => {
        let total = 0;
        Object.keys(basketItems).forEach((productId) => {
            const product = products.find((p) => p.id === productId);
            if (product) {
                //@ts-ignore
                total += product.price * basketItems[productId].quantity;
            }
        });
        return total;
    };

    const total = calculateTotalPrice();

    const decreaseQuantity = (productId: string) => {
        dispatch(basketActions.decreaseQuantity(productId));
    };

    const increaseQuantity = (productId: string) => {
        dispatch(basketActions.increaseQuantity(productId));
    };

    return (
        <div className={styles.container}>
            {Object.keys(basketItems).map((productId) => {
                const product = products.find((p) => p.id === productId);

                return (
                        <Paper sx={{maxWidth: '400px', height: '200px', padding: '20px'}}>
                            {product && (
                                <div className={styles.product}>
                                    <img className={styles.productPhoto} src={product.photo} alt="photo"/>
                                    <div className={styles.titlePrice}>
                                        <h3 className={styles.title}>{product.title}</h3>
                                        <p className={styles.price}>Price: {product.price} руб</p>
                                        <p className={styles.price}>Quantity: {basketItems[productId].quantity} </p>
                                    </div>

                                    <Button variant="outlined" onClick={() => decreaseQuantity(productId)}>
                                       -
                                    </Button>

                                    <Button variant="outlined" onClick={() => increaseQuantity(productId)}>
                                        +
                                    </Button>
                                </div>
                            )}
                        </Paper>
                );
            })}
            <div>
                <BasketForm/>
            </div>

            <p>Total Price: {total} руб</p>
        </div>
    )
}
