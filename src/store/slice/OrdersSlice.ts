import { createSlice } from "@reduxjs/toolkit";

const OrdersSlice = createSlice({
    name: "orders",
    initialState: {
        status: '',
        startDate: '',
        endDate: '',
    },
    reducers: {
        setStatus(state, {payload}) {
            state.status = payload.status
        },
        setStartData(state, action) {
            state.startDate = action.payload
        },
        setEndData(state, action) {
            state.endDate = action.payload
        }
    }
})

export const { setStatus, setStartData, setEndData } = OrdersSlice.actions

export default OrdersSlice.reducer