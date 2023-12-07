import {Middleware} from 'redux';
import {RootStateReducer} from '../../app/model/store';

export const localStorageMiddleware: Middleware<{}, RootStateReducer> = (store) => (next) => (action) => {
    const result = next(action);
    const basketItems = store.getState().basket;
    localStorage.setItem('basket', JSON.stringify(basketItems));
    return result;
};