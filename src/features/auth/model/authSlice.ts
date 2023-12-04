import {createSlice} from '@reduxjs/toolkit'
import {createAppAsyncThunk} from '../../../common/utils/createAppAsyncThunk';
import {signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';
import {auth, googleProvider} from '../../../config/firebase';
import {RegistrationProps} from '../ui/login/Login';
import {appActions} from '../../../app/model/appSlice';


const signIn = createAppAsyncThunk<
    { isLoggedIn: boolean },
    RegistrationProps
>('auth/login', async (arg, {rejectWithValue}) => {
    try {
        await signInWithEmailAndPassword(auth, arg.email, arg.password);
        return {isLoggedIn: true}
    } catch (e) {
        console.log(e);
        return rejectWithValue(null)
    }
})

const logout = createAppAsyncThunk<
    { isLoggedIn: boolean }
>('auth/logout', async (_, {rejectWithValue}) => {
    try {
        await signOut(auth);
        return {isLoggedIn: false}
    } catch (e) {
        console.log(e);
        return rejectWithValue(null)
    }
})

const signInGoogle = createAppAsyncThunk<
    { isLoggedIn: boolean }
>('auth/signInGoogle', async (_, {rejectWithValue}) => {
    try {
        await signInWithPopup(auth, googleProvider);
        return {isLoggedIn: true}
    } catch (e) {
        console.log(e);
        return rejectWithValue(null)
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
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
            });

        // .addCase(checkAuthStatus.pending, (state) => {
        //     state.status = true;
        //     state.error = null;
        // })
        // .addCase(checkAuthStatus.fulfilled, (state, action) => {
        //     state.isLoggedIn = !!action.payload; // Обновите здесь
        //     state.status = false;
        // })
        // .addCase(checkAuthStatus.rejected, (state, action) => {
        //     state.status = false;
        //     state.error = action.error.message;
        // })
    }
})


export const authSlice = slice.reducer
export const authThunks = {logout, signInGoogle, signIn, checkAuthStatus}

// types
export type AuthStateType = ReturnType<typeof slice.getInitialState>




// const createAnAccount = createAppAsyncThunk<
//     { isLoggedIn: boolean },
//     RegistrationProps
// >("auth/login", async (arg, thunkAPI) => {
//     const { dispatch, rejectWithValue } = thunkAPI
//     try {
//         await createUserWithEmailAndPassword(auth, arg.email, arg.password);
//         return {isLoggedIn: true}
//     } catch (e) {
//         console.log(e);
//         return rejectWithValue(null)
//     }
// })