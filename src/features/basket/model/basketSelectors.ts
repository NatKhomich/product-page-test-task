import { AppRootState } from "../../../app/model/store"

export const selectBasketItems = (state: AppRootState) => state.basket.basketItems
export const selectBasketTotal = (state: AppRootState) => state.basket.total