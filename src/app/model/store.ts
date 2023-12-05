import {AnyAction, combineReducers} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {authSlice} from '../../features/auth/model/authSlice';
import {appSlice} from './appSlice';
import {productSlice} from '../../features/ProductsList/model/productSlice';
import {basketSlice} from '../../features/basket/model/basketSlice';


const rootReducer = combineReducers({
    auth: authSlice,
    app: appSlice,
    product: productSlice,
    basket: basketSlice
})

export const store = configureStore({
    reducer: rootReducer,
});

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootState, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector
export type RootStateReducer = ReturnType<typeof rootReducer>
