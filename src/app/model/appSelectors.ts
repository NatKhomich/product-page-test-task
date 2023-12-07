import {AppRootState} from './store';

export const selectAppError = (state: AppRootState) => state.app.error
export const selectAppStatus = (state: AppRootState) => state.app.status
export const selectAppIsInitialized = (state: AppRootState) => state.app.isInitialized