import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        authData:builder.mutation({
            query:(payload)=>({
                url:'user/auth',
                method:"POST",
                body:{
                   ...payload
                }
            })
        })
    })
})

export const {useAuthDataMutation } = authApiSlice;