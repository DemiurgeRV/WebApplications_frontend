import { combineReducers, configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./slice/LoginSlice";

const rootReducer = combineReducers({
    login: LoginSlice
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;