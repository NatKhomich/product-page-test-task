import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type BasketItem = {
    id: string;
    quantity: number;
};


type BasketState = {
    items: Record<string, BasketItem>; // Record для хранения id продукта и количества
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
            if (state.items[productId]) {
                state.items[productId].quantity += 1;
            } else {
                state.items[productId] = { id: productId, quantity: 1 };
            }
        },
        decreaseQuantity: (state, action: PayloadAction<string>) => {
            const productId = action.payload;
            if (state.items[productId] && state.items[productId].quantity > 1) {
                state.items[productId].quantity -= 1;
            } else {
                delete state.items[productId];
            }
        },
        increaseQuantity: (state, action: PayloadAction<string>) => {
            const productId = action.payload;
            if (state.items[productId]) {
                state.items[productId].quantity += 1;
            }
        },
        removeFromBasket: (state, action: PayloadAction<string>) => {
            const productId = action.payload;
            delete state.items[productId];
        },
    },
});

export const basketActions = slice.actions
export const basketSlice = slice.reducer
