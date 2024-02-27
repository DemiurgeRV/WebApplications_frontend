import { createSlice } from "@reduxjs/toolkit";

const OrdersSlice = createSlice({
    name: "orders",
    initialState: {
        status: '',
        startDate: '',
        endDate: '',
        owner: ''
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
        },
        setOwner(state, action) {
            state.owner = action.payload
        },
        resetSearch(state) {
            state.status = '',
            state.startDate = '',
            state.endDate = '',
            state.owner = ''
        }
    }
})

export const { setStatus, setStartData, setEndData, setOwner, resetSearch } = OrdersSlice.actions

export default OrdersSlice.reducer