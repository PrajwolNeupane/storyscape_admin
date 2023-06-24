import { createSlice,PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    token:string | null
}

const initialState:InitialState = {
    token : null
}

const TokenSlice = createSlice({
    name:"Token",
    initialState,
    reducers:{
        setToken:(state,action:PayloadAction<string | null>) => {
            state.token = action.payload
        }
    }
})

export default TokenSlice.reducer;
export const {setToken} = TokenSlice.actions; 