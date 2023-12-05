import React from 'react';
import {ProductType} from '../../../../App';
import {Button} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import styles from './Product.module.css'
import {useAppDispatch} from '../../../../app/model/store';
import {basketActions} from '../../../basket/model/basketSlice';

type Props = {
    item: Partial<ProductType>
}

export const Product = ({item}: Props) => {
    const dispatch = useAppDispatch();

    const addToBasketHandler = (id: string) => {
        dispatch(basketActions.addToBasket(id));
    }

    return (
        <div className={styles.item}>
            <h3 className={styles.title}>{item.title}</h3>
            <img className={styles.productPhoto} src={item.photo} alt="photo"/>
            <p className={styles.description}>{item.description}</p>
            <p className={styles.price}>Price: {item.price} руб</p>

            <div onClick={() => addToBasketHandler(item.id ? item.id : '')}>
                <Button variant={'contained'}
                        color={'secondary'}
                >
                    Add to cart
                    <AddShoppingCartIcon sx={{cursor: 'pointer', width: '100px'}}/>
                </Button>
            </div>
        </div>
    );
};
