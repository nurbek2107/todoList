import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null,
    isAuthReady:false,
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        login: (state, {payload}) => {
            state.user = payload
        },
        logout: (state) => {
            state.user = null
        },
        isAuthChange: (state) => {
            state.isAuthReady = true
        },
    }
})

export const {logout,login,isAuthChange} = userSlice.actions
export default userSlice.reducer