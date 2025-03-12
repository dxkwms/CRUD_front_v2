import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "@/types/IUser";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_DATABASE_URL}/`,
  }),
  endpoints: (builder) => ({
    getUserById: builder.query<IUser, string>({
      query: (id) => `users/${id}`,
    }),

    getUserByToken: builder.query({
      query: (accessToken) => ({
        url: "auth/user",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),

    getAllUsers: builder.query<IUser, string>({
      query: () => `/users`,
    }),

    createUser: builder.mutation({
      query: (user: IUser) => ({
        url: `auth/signup`,
        method: "POST",
        body: user,
      }),
    }),

    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
    }),

    addProfile: builder.mutation({
      query: ({ userToken, profile }) => ({
        url: `users/${userToken}/profiles`,
        method: "POST",
        body: profile,
      }),
    }),

    updateProfile: builder.mutation({
      query: ({ userToken, profileId, profile }) => ({
        url: `users/${userToken}/profiles/${profileId}`,
        method: "PUT",
        body: profile,
      }),
    }),

    deleteProfile: builder.mutation({
      query: ({ userToken, profileId }) => ({
        url: `users/${userToken}/profiles/${profileId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetUserByTokenQuery,
  useCreateUserMutation,
  useAddProfileMutation,
  useDeleteProfileMutation,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
} = usersApi;
