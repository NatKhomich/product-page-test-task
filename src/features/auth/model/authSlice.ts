import {createSlice} from '@reduxjs/toolkit'
import {createAppAsyncThunk} from '../../../common/utils/createAppAsyncThunk';
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';
import {auth, googleProvider} from '../../../config/firebase';
import {RegistrationProps} from '../ui/registration/Registration';


const signIn = createAppAsyncThunk<
    { isLoggedIn: boolean },
    RegistrationProps
>("auth/login", async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
        await createUserWithEmailAndPassword(auth, arg.email, arg.password);
        return {isLoggedIn: true}
    } catch (e) {
        console.log(e);
        return rejectWithValue(null)
    }
})

const logout = createAppAsyncThunk<
    { isLoggedIn: boolean }
>("auth/logout", async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
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
>("auth/signInGoogle", async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
        await signInWithPopup(auth, googleProvider);
        return {isLoggedIn: true}
    } catch (e) {
        console.log(e);
        return rejectWithValue(null)
    }
})

const slice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
    },
    reducers: {},
    extraReducers: builder => {

    }
})


export const authSlice = slice.reducer
export const authThunks = { signIn, logout, signInGoogle }

// types
export type AuthStateType = ReturnType<typeof slice.getInitialState>