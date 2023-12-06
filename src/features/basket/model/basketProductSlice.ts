import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from '../../../app/ui/App';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import {calculateTotalPrice} from '../../../common/utils/calculateTotalPrice';
import {OrderData} from '../ui/BasketForm';

const loadBasketFromLocalStorage = (): any => {
    const storedBasket = localStorage.getItem('basket');
    return storedBasket ? JSON.parse(storedBasket) : undefined;
};

export type BasketItemType = {
    id: string;
    quantity: number;
};

export type BasketState = {
    productList: Partial<ProductType>[];
    items: BasketItemType[];
    total: number;
};

const initialState: BasketState = loadBasketFromLocalStorage() || {
    productList: [],
    items: [],
    total: 0,
};

export const fetchProductList = createAsyncThunk(
    'product/fetchProductList',
    async (_, { rejectWithValue }) => {
        try {
            const productCollectionRef = collection(db, 'product');
            const data = await getDocs(productCollectionRef);
            return data.docs.map((el) => ({ ...el.data(), id: el.id })) as ProductType[];
        } catch (error) {
            console.error(error);
            return rejectWithValue('Failed to fetch product list');
        }
    }
);

const slice = createSlice({
    name: 'basketProduct',
    initialState,
    reducers: {
        addToBasket: (state, action: PayloadAction<{ id: string }>) => {
            const currentItem = state.items.find((i) => i.id === action.payload.id);
            if (currentItem) {
                currentItem.quantity += 1;
            } else {
                state.items.push({ id: action.payload.id, quantity: 1 });
            }
            state.total = calculateTotalPrice(state.items, state.productList);
        },
        increaseQuantity: (state, action: PayloadAction<{ id: string }>) => {
            const currentItem = state.items.find((i) => i.id === action.payload.id);
            if (currentItem) {
                currentItem.quantity += 1;
            }
            state.total = calculateTotalPrice(state.items, state.productList);
        },
        decreaseQuantity: (state, action: PayloadAction<{ id: string }>) => {
            const currentItem = state.items.find((i) => i.id === action.payload.id);
            if (currentItem && currentItem.quantity > 1) {
                currentItem.quantity -= 1;
                state.total = calculateTotalPrice(state.items, state.productList);
            } else {
                state.items = state.items.filter((item) => item.id !== action.payload.id);
            }
            state.total = calculateTotalPrice(state.items, state.productList);
        },
        removeFromBasket: (state, action: PayloadAction<{ id: string }>) => {
            state.items = state.items.filter((item) => item.id !== action.payload.id);
            state.total = calculateTotalPrice(state.items, state.productList);
        },
        orderToSend: (state, action: PayloadAction<OrderData>) => {
            state.items = [];
            state.total = 0;
            // console.log('Order placed:', action.payload);
            const jsonString = JSON.stringify(action.payload);
            console.log(jsonString)
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductList.fulfilled, (state, action) => {
            state.productList = action.payload;
            // После успешного получения продуктов, обнови total
            state.total = calculateTotalPrice(state.items, action.payload);
        });
    },
});

export const basketProductActions = slice.actions;
export const basketProductThunks = { fetchProductList };
export const basketProductSlice = slice.reducer;
