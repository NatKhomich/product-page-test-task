import React from 'react';
import {Paper} from '@mui/material';
import styles from '../Basket.module.css';
import Button from '@mui/material/Button';
import {ProductType} from '../../../../../app/ui/App';
import {BasketItemType, basketProductActions} from '../../../model/basketProductSlice';
import {useAppDispatch} from '../../../../../app/model/store';

type Props = {
    product: Partial<ProductType>
    item: BasketItemType
}
export const BasketItem = ({product, item}: Props) => {

    const dispatch = useAppDispatch()

    const decreaseQuantity = (id: string) => {
        dispatch(basketProductActions.decreaseQuantity({id}));
    };

    const increaseQuantity = (id: string) => {
        dispatch(basketProductActions.increaseQuantity({id}));
    };

    return (
        <Paper className={styles.paper}>
            <div>
                <img className={styles.productPhoto} src={product.photo} alt="photo"/>
            </div>

            <div className={styles.descriptionAndButton}>
                <div className={styles.titlePrice}>
                    <h3 className={styles.title}>{product.title}</h3>
                    <p className={styles.price}>Price: {product.price} руб</p>
                    <p className={styles.price}>Quantity: {item.quantity} </p>
                </div>

                <div className={styles.button}>
                    <Button sx={{height: '40px'}} variant="contained" color={'secondary'}
                            onClick={() => decreaseQuantity(item.id)}>
                        -
                    </Button>

                    <Button sx={{height: '40px'}} variant="contained" color={'secondary'}
                            onClick={() => increaseQuantity(item.id)}>
                        +
                    </Button>
                </div>
            </div>


        </Paper>
    );
};
