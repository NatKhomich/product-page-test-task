import React from 'react';
import {ProductType} from '../../../../App';
import {Button} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import styles from './Product.module.css'

type Props = {
    item: Partial<ProductType>
}

export const Product = ({item}: Props) => {
    return (
        <div className={styles.item} key={item.id}>
            <h3 className={styles.title}>{item.title}</h3>
            <img className={styles.productPhoto} src={item.photo} alt="photo"/>
            <p className={styles.description}>{item.description}</p>
            <p className={styles.price}>Price: {item.price} руб</p>

            <Button variant={'contained'}
                    color={'secondary'}
            >
                Add to cart
                <AddShoppingCartIcon sx={{cursor: 'pointer', width: '100px'}}/>
            </Button>
        </div>
    );
};
