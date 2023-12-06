import {ProductType} from '../../app/ui/App';
import {BasketItemType} from '../../features/basket/model/basketProductSlice';

export const calculateTotalPrice = (
    basketItems: BasketItemType[],
    products: Partial<ProductType>[]
) => {
    let total = 0;
    basketItems.forEach((item) => {
        const product = products.find((p) => p.id === item.id);
        if (product && product.price) {
            total += product.price * item.quantity;
        }
    });
    return total;
};