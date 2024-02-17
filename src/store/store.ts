import { combineReducers, configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./slice/LoginSlice";
import OrdersSlice from "./slice/OrdersSlice";
import DraftSlice from "./slice/DraftSlice";

const rootReducer = combineReducers({
    login: LoginSlice,
    orders: OrdersSlice,
    draft: DraftSlice
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;