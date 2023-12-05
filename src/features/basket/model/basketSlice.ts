import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type BasketState = {
    items: Record<string, number>; // Record для хранения id продукта и количества
};

const initialState: BasketState = {
    items: {},
};

const slice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addToBasket: (state, action: PayloadAction<string>) => {
            const productId = action.payload;
            state.items[productId] = (state.items[productId] || 0) + 1;
        },
    },
});

export const basketActions = slice.actions
export const basketSlice = slice.reducer
