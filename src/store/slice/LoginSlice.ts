import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { useSelector } from "react-redux";

const loginSlice = createSlice({
    name: "login",
    initialState: {
        is_auth: false,
        role: false,
        login: ''
    },
    reducers: {
        setUser(state, {payload}) {
            state.is_auth = true,
            state.role = payload.role,
            state.login = payload.login,
            localStorage.setItem('is_auth', payload.is_auth),
            localStorage.setItem('login', payload.login)
        },
        logoutUser(state) {
            state.is_auth = false,
            state.role = false
        }
    }
})  

export const useIsAuth = () => 
    useSelector((state: RootState) => state.login.is_auth)

export const useRole = () => 
    useSelector((state: RootState) => state.login.role)

export const useLogin = () => 
    useSelector((state: RootState) => state.login.login)

export const { setUser, logoutUser } = loginSlice.actions

export default loginSlice.reducer