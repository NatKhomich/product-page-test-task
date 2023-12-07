import {BasketItemType} from '../../features/basket/model/basketSlice';

export const calculateTotalPrice = (basketItems: BasketItemType[]) => {
    let total = 0;
    basketItems.forEach((item) => {
        total += item.price * item.quantity;
    });
    return total;
};