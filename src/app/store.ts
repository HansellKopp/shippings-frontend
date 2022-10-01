import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from "features/app/appSlice";
import { authSlice } from "features/auth/authSlice";
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
    reducer: {
        app: appSlice.reducer,
        auth: authSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch