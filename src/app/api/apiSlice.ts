import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_REACT_API_URL}/api/v2`,
  prepareHeaders: (headers) => {
    headers.set("api_key", `${import.meta.env.VITE_REACT_API_KEY}`);
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: ["Schedules", "LostAndFound", "const"],
  endpoints: (_builder) => ({}),
});
