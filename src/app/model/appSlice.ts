import { createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit"

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

const slice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isInitialized: false
  },
  reducers: {
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
    setAppError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        isPending,
        (state) => {
          state.status = "loading"
        })
      .addMatcher(
        isRejected,
        (state) => {
          state.status = "failed"
        })
      .addMatcher(
        isFulfilled,
        (state) => {
          state.status = "succeeded"
        })
  }

})


export const appSlice = slice.reducer
export const appActions = slice.actions

// types
export type AuthStateType = ReturnType<typeof slice.getInitialState>
