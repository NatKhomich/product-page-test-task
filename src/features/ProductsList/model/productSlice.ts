import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../../../config/firebase';

export type ProductProps = {
    description: string
    id: string
    photo: string
    price: number
    title: string
}

export const fetchProductList = createAsyncThunk(
    'product/fetchProductList',
    async (_, { rejectWithValue }) => {
        try {
            const productCollectionRef = collection(db, 'product');
            const data = await getDocs(productCollectionRef);
            return data.docs.map((el) => ({ ...el.data(), id: el.id })) as ProductProps[];
        } catch (error) {
            console.error(error);
            return rejectWithValue('Failed to fetch product list');
        }
    }
);

const slice = createSlice({
    name: 'product',
    initialState: {
        productList: [] as Partial<ProductProps>[]
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProductList.fulfilled, (state, action) => {
            state.productList = action.payload;
        });
    },
});


export const productThunks = { fetchProductList };
export const productSlice = slice.reducer;
