import { combineReducers, configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./slice/LoginSlice";
import OrdersSlice from "./slice/OrdersSlice";

const rootReducer = combineReducers({
    login: LoginSlice,
    orders: OrdersSlice
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;