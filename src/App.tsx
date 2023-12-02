import React, {useEffect, useState} from 'react';
import './App.css';
import {Auth} from './components/auth';
import {db} from './config/firebase'
import {getDocs, collection} from 'firebase/firestore'

type ProductType = {
    description: string
    id: string
    photo: string
    price: number
    title: string
}

function App() {
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
        <div className="App">
            <Auth/>

            <h1> Data from data base</h1>

            <div className='lists'>
                {productList.map(p => {
                    return (
                        <div className={'item'} key={p.id}>
                            <h3>{p.title}</h3>
                            <img style={{width: '200px'}} src={p.photo} alt="photo"/>
                            <p>{p.description}</p>
                            <p>Price: {p.price} руб</p>
                        </div>
                    )
                })}
            </div>

        </div>
    );
}

export default App;
