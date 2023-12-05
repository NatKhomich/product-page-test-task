import {createSlice} from '@reduxjs/toolkit'
import {createAppAsyncThunk} from '../../../common/utils/createAppAsyncThunk';
import {signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';
import {auth, googleProvider} from '../../../config/firebase';
import {RegistrationProps} from '../ui/login/Login';
import {appActions} from '../../../app/model/appSlice';


const signIn = createAppAsyncThunk<
    { isLoggedIn: boolean },
    RegistrationProps
>('auth/login', async (arg, {dispatch, rejectWithValue}) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    try {
        await signInWithEmailAndPassword(auth, arg.email, arg.password);
        return {isLoggedIn: true}
    } catch (e) {
        console.log(e);
        return rejectWithValue(null)
    }
    finally {
        dispatch(appActions.setAppStatus({ status: 'idle' }))
    }
})

const logout = createAppAsyncThunk<
    { isLoggedIn: boolean }
>('auth/logout', async (_, {dispatch, rejectWithValue}) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    try {
        await signOut(auth);
        return {isLoggedIn: false}
    } catch (e) {
        console.log(e);
        return rejectWithValue(null)
    }
    finally {
        dispatch(appActions.setAppStatus({ status: 'idle' }))
    }
})

const signInGoogle = createAppAsyncThunk<
    { isLoggedIn: boolean }
>('auth/signInGoogle', async (_, {dispatch, rejectWithValue}) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    try {
        await signInWithPopup(auth, googleProvider);
        return {isLoggedIn: true}
    } catch (e) {
        console.log(e);
        return rejectWithValue(null)
    }
    finally {
        dispatch(appActions.setAppStatus({ status: 'idle' }))
    }
})

export const checkAuthStatus = createAppAsyncThunk<{ isLoggedIn: boolean }, any>(
    'auth/checkAuthStatus',
    async (_, {dispatch ,rejectWithValue}) => {
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
        }
        finally {
            dispatch(appActions.setAppInitialized({ isInitialized: true }));
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
            });
    }
})


export const authSlice = slice.reducer
export const authThunks = {logout, signInGoogle, signIn, checkAuthStatus}

// types
export type AuthStateType = ReturnType<typeof slice.getInitialState>