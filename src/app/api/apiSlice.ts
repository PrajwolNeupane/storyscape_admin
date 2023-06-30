import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api/v2/",
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
