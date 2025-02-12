import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DATABASE_URL } from "@/api/DATABASE_URL";
import { IUser } from "@/types/IUser";
import build from "next/dist/build";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${DATABASE_URL}/users` }),
  endpoints: (builder) => ({
    getUserById: builder.query<IUser, string>({
      query: (id) => `/${id}`,
    }),

    getAllUsers: builder.query<IUser, string>({
      query: () => `/`,
    }),

    getUserByEmail: builder.query<IUser, string>({
      query: (email) => `/email/${email}`,
    }),

    createUser: builder.mutation({
      query: (user: IUser) => ({
        url: `/`,
        method: "POST",
        body: user,
      }),
    }),

    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),

    addProfile: builder.mutation({
      query: ({ userId, profile }) => ({
        url: `/${userId}/profiles`,
        method: "POST",
        body: profile,
      }),
    }),

    updateProfile: builder.mutation({
      query: ({ userId, profileId, profile }) => ({
        url: `/${userId}/profiles/${profileId}`,
        method: "PUT",
        body: profile,
      }),
    }),

    deleteProfile: builder.mutation({
      query: ({ userId, profileId }) => ({
        url: `/${userId}/profiles/${profileId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetUserByEmailQuery,
  useCreateUserMutation,
  useAddProfileMutation,
  useDeleteProfileMutation,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
} = usersApi;
