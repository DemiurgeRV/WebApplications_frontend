import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const DraftSlice = createSlice({
    name: "draft",
    initialState: {
        image: null
    },
    reducers: {
        setImageOrder(state, action) {
            state.image = action.payload
            console.log('slice', state.image)
        }
    }
})

export const useImg = () => 
    useSelector((state: RootState) => state.draft.image)

export const { setImageOrder } = DraftSlice.actions

export default DraftSlice.reducer