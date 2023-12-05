import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {collection, getDocs} from 'firebase/firestore';
import {ProductType} from '../../../App';
import {db} from '../../../config/firebase';


export const fetchProductList = createAsyncThunk('product/fetchProductList',
    async (_, { rejectWithValue }) => {
    try {
        const productCollectionRef = collection(db, 'product');
        const data = await getDocs(productCollectionRef);
        return data.docs.map(el => ({...el.data(), id: el.id})) as ProductType[];
    } catch (error) {
        console.error(error);
        return rejectWithValue('Failed to fetch product list');
    }
});

const slice = createSlice({
    name: 'product',
    initialState: {
        productList: [] as Partial<ProductType>[],
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchProductList.fulfilled, (state, action) => {
                state.productList = action.payload;
            })
    },
});


export const productSlice = slice.reducer
export const productThunks = {fetchProductList}
