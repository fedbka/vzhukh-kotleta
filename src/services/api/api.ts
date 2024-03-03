import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://norma.nomoreparties.space/api";
const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json; charset=utf-8");
    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  endpoints: () => ({}),
});

