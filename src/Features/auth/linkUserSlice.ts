import { apiSlice } from '../../app/api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    linkUser: builder.mutation({
      query: (credentials) => ({
        url: 'user/admin/linkUser',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLinkUserMutation } = authApiSlice;