import { apiSlice } from '../../app/api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: 'user/admin/createUser',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useSignupMutation } = authApiSlice;