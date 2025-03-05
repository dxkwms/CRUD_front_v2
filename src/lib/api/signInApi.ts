import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const signInApi = createApi({
  reducerPath: "tokenApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_DATABASE_URL }),
  endpoints: (builder) => ({
    refreshToken: builder.mutation({
      query: (oldToken) => ({
        url: "/refresh-token",
        method: "POST",
        body: { token: oldToken },
      }),
    }),
    signIn: builder.mutation({
      query: ({ email, password }) => ({
        url: "auth/signin",
        method: "POST",
        body: { email, password },
      }),
    }),
  }),
});

export const { useRefreshTokenMutation, useSignInMutation } = signInApi;
