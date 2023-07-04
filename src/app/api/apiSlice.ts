import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${{import.meta.env.VITE_REACT_API_URL}`,
  prepareHeaders: (headers) => {
    headers.set("api_key", `mero-54321-app`);
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: ["Schedules", "LostAndFound", "const"],
  endpoints: (_builder) => ({}),
});
