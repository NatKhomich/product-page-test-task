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
import {Grid, Paper} from '@mui/material';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../../app/model/store';
import styles from '../../ProductsList/ui/Product/Product.module.css';

export const Basket = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const basketItems = useAppSelector((state) => state.basket.items);
    const products = useAppSelector((state) => state.product.productList);

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>;
    }

    return (
        <div style={{display: 'flex'}}>
            <h2>Your Basket</h2>
            {Object.keys(basketItems).map((productId) => {
                const product = products.find((p) => p.id === productId)

                return (
                    <Grid item key={productId}>
                        <Paper sx={{maxWidth: '300px', padding: '20px', display: 'flex'}}>
                            {product && (
                                <div>
                                    <h3 className={styles.title}>{product.title}</h3>
                                    <img className={styles.productPhoto} src={product.photo} alt="photo"/>
                                    <p className={styles.price}>Price: {product.price} руб</p>

                                </div>
                            )}
                        </Paper>
                    </Grid>
                );
            })}


            <div>
            оформить

            </div>
        </div>
    )
}
