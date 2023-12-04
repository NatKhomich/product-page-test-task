import React, {useEffect, useState} from 'react';
import {ProductType} from '../../../App';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../../../config/firebase';
import {Product} from './Product/Product';
import {Grid, Paper} from '@mui/material';

export const ProductsList = () => {

    const [productList, setProductList] = useState<Partial<ProductType>[]>([]);

    const productCollectionRef = collection(db, 'product')

    useEffect(() => {
        const getProductList = async () => {
            try {
                const data = await getDocs(productCollectionRef)
                const filteredData = data.docs.map(el => ({...el.data(), id: el.id}))
                console.log(filteredData)
                setProductList(filteredData)
            } catch (error) {
                console.log(error)
            }
        }
        getProductList()
    }, [])

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

