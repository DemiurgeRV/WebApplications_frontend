import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const DraftSlice = createSlice({
    name: "draft",
    initialState: {
        image: null,
        is_create: false,
    },
    reducers: {
        setImageOrder(state, action) {
            state.image = action.payload
        },
        setBasket(state) {
            state.is_create = true
            console.log('setBasket')
        },
        resetDraft(state) {
            state.is_create = false
            state.image = null
            console.log('resetDraft')
        }
    }
})

export const useImg = () => 
    useSelector((state: RootState) => state.draft.image)

export const useBasket = () =>
    useSelector((state: RootState) => state.draft.is_create)

export const { setImageOrder, setBasket, resetDraft } = DraftSlice.actions

export default DraftSlice.reducer