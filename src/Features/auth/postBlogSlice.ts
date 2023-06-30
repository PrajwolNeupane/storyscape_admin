import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        postBlog:builder.mutation({
            query:(payload)=>({
                url:'blog',
                method:"POST",
                body:{
                   ...payload
                }
            })
        })
    })
})

export const {usePostBlogMutation } = authApiSlice;