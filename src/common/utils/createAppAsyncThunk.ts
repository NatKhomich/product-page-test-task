import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch, AppRootState} from '../../app/model/store';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootState
    dispatch: AppDispatch
    rejectValue: null | undefined
}>()