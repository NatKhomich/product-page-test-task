import {createSlice} from '@reduxjs/toolkit'
import {createAppAsyncThunk} from '../../../common/utils/createAppAsyncThunk';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';
import {auth, googleProvider} from '../../../config/firebase';
import {appActions} from '../../../app/model/appSlice';
import {AuthProps} from '../ui/AuthForm';

const register = createAppAsyncThunk<
    { isLoggedIn: boolean },
    AuthProps
>('auth/register', async (arg, {dispatch, rejectWithValue}) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        await createUserWithEmailAndPassword(auth, arg.email, arg.password);
        return {isLoggedIn: true}
    } catch (e) {
        console.log(e);
        return rejectWithValue(null)
    } finally {
        dispatch(appActions.setAppStatus({status: 'idle'}))
    }
})

const signIn = createAppAsyncThunk<
    { isLoggedIn: boolean },
    AuthProps
>('auth/login', async (arg, {dispatch, rejectWithValue}) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        await signInWithEmailAndPassword(auth, arg.email, arg.password);
        return {isLoggedIn: true}
    } catch (e: any) {
        console.log(e.message);
        return rejectWithValue(null)
    } finally {
        dispatch(appActions.setAppStatus({status: 'idle'}))
    }
})

const logout = createAppAsyncThunk<
    { isLoggedIn: boolean }
>('auth/logout', async (_, {dispatch, rejectWithValue}) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        await signOut(auth);
        return {isLoggedIn: false}
    } catch (e) {
        console.log(e);
        return rejectWithValue(null)
    } finally {
        dispatch(appActions.setAppStatus({status: 'idle'}))
    }
})

const signInGoogle = createAppAsyncThunk<
    { isLoggedIn: boolean }
>('auth/signInGoogle', async (_, {dispatch, rejectWithValue}) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        await signInWithPopup(auth, googleProvider);
        return {isLoggedIn: true}
    } catch (e) {
        console.log(e);
        return rejectWithValue(null)
    } finally {
        dispatch(appActions.setAppStatus({status: 'idle'}))
    }
})

const checkAuthStatus = createAppAsyncThunk<{ isLoggedIn: boolean }, any>(
    'auth/checkAuthStatus',
    async (_, {dispatch, rejectWithValue}) => {
        try {
            return await new Promise((resolve) => {
                const unsubscribe = auth.onAuthStateChanged((user) => {
                    unsubscribe();
                    const isLoggedIn = user !== null;
                    resolve({isLoggedIn});
                });
            });
        } catch (e) {
            console.log(e);
            return rejectWithValue(null);
        } finally {
            dispatch(appActions.setAppInitialized({isInitialized: true}));
        }
    }
);

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(checkAuthStatus.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
            })
            .addCase(signInGoogle.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
            })
    }
})


export const authSlice = slice.reducer
export const authThunks = {logout, signInGoogle, signIn, checkAuthStatus, register}

// types
export type AuthStateType = ReturnType<typeof slice.getInitialState>