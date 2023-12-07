import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "../../../common/utils/createAppAsyncThunk"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithRedirect, signOut } from "firebase/auth"
import { auth, googleProvider } from "../../../config/firebase"
import { appActions } from "../../../app/model/appSlice"
import { AuthProps } from "../ui/AuthForm"

const register = createAppAsyncThunk<
  { isLoggedIn: boolean },
  AuthProps
>("auth/register", async (arg, { dispatch, rejectWithValue }) => {
  try {
    await createUserWithEmailAndPassword(auth, arg.email, arg.password)
    return { isLoggedIn: true }
  } catch (e: any) {
    dispatch(appActions.setAppError(e.message))
    return rejectWithValue(null)
  }
})

const signIn = createAppAsyncThunk<
  { isLoggedIn: boolean },
  AuthProps
>("auth/login", async (arg, { dispatch, rejectWithValue }) => {
  try {
    await signInWithEmailAndPassword(auth, arg.email, arg.password)
    return { isLoggedIn: true }
  } catch (e: any) {
    dispatch(appActions.setAppError(e.message))
    return rejectWithValue(null)
  }
})

const logout = createAppAsyncThunk<
  { isLoggedIn: boolean }
>("auth/logout", async (_, { dispatch, rejectWithValue }) => {
  try {
    await signOut(auth)
    return { isLoggedIn: false }
  } catch (e: any) {
    dispatch(appActions.setAppError(e.message))
    return rejectWithValue(null)
  }
})

const signInGoogle = createAppAsyncThunk<
  { isLoggedIn: boolean }
>("auth/signInGoogle", async (_, { dispatch, rejectWithValue }) => {
  try {
    await signInWithRedirect(auth, googleProvider)
    return { isLoggedIn: true }
  } catch (e: any) {
    dispatch(appActions.setAppError(e.message))
    return rejectWithValue(undefined)
  }
})

const checkAuthStatus = createAppAsyncThunk<{ isLoggedIn: boolean }, any>(
  "auth/checkAuthStatus",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      return await new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          unsubscribe()
          const isLoggedIn = user !== null
          resolve({ isLoggedIn })
        })
      })
    } catch (e: any) {
      dispatch(appActions.setAppError(e.message))
      return rejectWithValue(null)
    } finally {
      dispatch(appActions.setAppInitialized({ isInitialized: true }))
    }
  }
)

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        isAnyOf(authThunks.signIn.fulfilled,
          authThunks.checkAuthStatus.fulfilled,
          authThunks.signInGoogle.fulfilled,
          authThunks.logout.fulfilled,
          authThunks.register.fulfilled),
        (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
        })
  }
})


export const authSlice = slice.reducer
export const authThunks = { logout, signInGoogle, signIn, checkAuthStatus, register }

// types
export type AuthStateType = ReturnType<typeof slice.getInitialState>
