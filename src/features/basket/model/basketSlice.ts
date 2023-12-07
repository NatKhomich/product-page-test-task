import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { OrderData } from "../ui/BasketForm"
import { calculateTotalPrice } from "../../../common/utils/calculateTotalPrice"

const loadBasketFromLocalStorage = (): any => {
  const storedBasket = localStorage.getItem("basket")
  return storedBasket ? JSON.parse(storedBasket) : undefined
}

export type BasketItemType = {
  id: string;
  price: number
  quantity: number;
};

export type BasketState = {
  basketItems: BasketItemType[];
  total: number
};

const initialState: BasketState = loadBasketFromLocalStorage() || {
  basketItems: [],
  total: 0
}


const slice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<{ id: string, price: number }>) => {
      const currentItem = state.basketItems.find((i) => i.id === action.payload.id)
      if (currentItem) {
        currentItem.quantity += 1
      } else {
        state.basketItems.push({ id: action.payload.id, quantity: 1, price: action.payload.price })
      }
      state.total = calculateTotalPrice(state.basketItems)
    },
    increaseQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const currentItem = state.basketItems.find((i) => i.id === action.payload.id)
      if (currentItem) {
        currentItem.quantity += 1
      }
      state.total = calculateTotalPrice(state.basketItems)
    },
    decreaseQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const currentItem = state.basketItems.find((i) => i.id === action.payload.id)
      if (currentItem && currentItem.quantity > 1) {
        currentItem.quantity -= 1
        state.total = calculateTotalPrice(state.basketItems)
      } else {
        state.basketItems = state.basketItems.filter((item) => item.id !== action.payload.id)
      }
      state.total = calculateTotalPrice(state.basketItems)
    },
    removeFromBasket: (state, action: PayloadAction<{ id: string }>) => {
      state.basketItems = state.basketItems.filter((item) => item.id !== action.payload.id)
      state.total = calculateTotalPrice(state.basketItems)
    },
    orderToSend: (state, action: PayloadAction<OrderData>) => {
      state.basketItems = []
      state.total = 0
      const jsonString = JSON.stringify(action.payload)
      console.log(jsonString)
    }
  }
})

export const basketActions = slice.actions
export const basketSlice = slice.reducer
