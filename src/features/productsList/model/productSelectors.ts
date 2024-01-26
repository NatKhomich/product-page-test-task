import { AppRootState } from "../../../app/model/store"

export const selectProductList = (state: AppRootState) => state.product.productList