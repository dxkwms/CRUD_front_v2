import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "@/types/IUser";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_DATABASE_URL}/`,
  }),
  endpoints: (builder) => ({
    getUserById: builder.query<IUser, string>({
      query: (id) => `/${id}`,
    }),

    getAllUsers: builder.query<IUser, string>({
      query: () => `/users`,
    }),

    getUserByEmail: builder.query<IUser, string>({
      query: (email) => `users/email/${email}`,
    }),

    createUser: builder.mutation({
      query: (user: IUser) => ({
        url: `/signup`,
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
      query: ({ userId, profile }) => ({
        url: `users/${userId}/profiles`,
        method: "POST",
        body: profile,
      }),
    }),

    updateProfile: builder.mutation({
      query: ({ userId, profileId, profile }) => ({
        url: `users/${userId}/profiles/${profileId}`,
        method: "PUT",
        body: profile,
      }),
    }),

    deleteProfile: builder.mutation({
      query: ({ userId, profileId }) => ({
        url: `users/${userId}/profiles/${profileId}`,
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

export const avatarApi = createApi({
  reducerPath: "avatarApi",
  baseQuery: fetchBaseQuery({ baseUrl: `` }),
  endpoints: (builder) => ({
    addAvatar: builder.mutation({
      query: ({ formData, avatar }) => ({
        url: `/api/avatar/upload?filename=${avatar.name}`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useAddAvatarMutation } = avatarApi;
