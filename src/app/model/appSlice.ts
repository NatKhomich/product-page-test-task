import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {checkAuthStatus} from '../../features/auth/model/authSlice';

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const slice = createSlice({
    name: 'app',
    initialState: {
        status: "idle" as RequestStatusType,
        error: null as string | null,
        isInitialized: false,
    },
    reducers: {
        // setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
        //     state.error = action.payload.error;
        // },
        // setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
        //     state.status = action.payload.status;
        // },
        setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized;
        }
    },
    extraReducers: builder => {
        builder
        .addCase(checkAuthStatus.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(checkAuthStatus.fulfilled, (state, action) => {
            state.status = 'succeeded';
        })
        .addCase(checkAuthStatus.rejected, (state, action) => {
            state.status = 'failed';
        })
    }
})


export const appSlice = slice.reducer
export const appActions = slice.actions

// types
export type AuthStateType = ReturnType<typeof slice.getInitialState>
