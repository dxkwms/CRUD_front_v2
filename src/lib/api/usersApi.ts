import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProfile, IUser } from "@/types/IUser";
import {FILTERS} from "@/types/filtersEnum";

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

    getAllUsers: builder.query<
      { users: IUser[]; totalPages: number; currentPage: number },
      { page: number; limit: number; searchEmail: string }
    >({
      query: ({ page, limit, searchEmail }) => ({
        url: `/users/`,
        params: { page, limit, searchEmail },
      }),
    }),

    createUser: builder.mutation({
      query: (user: IUser) => ({
        url: `auth/signup`,
        method: "POST",
        body: user,
      }),
    }),

    deleteUser: builder.mutation({
      query: (userId: string) => ({
        url: `users/${userId}`,
        method: "DELETE",
      }),
    }),

    editUser: builder.mutation({
      query: ({
        userId,
        updateData,
      }: {
        userId: string;
        updateData: IUser;
      }) => ({
        url: `users/${userId}`,
        method: "PUT",
        body: updateData,
      }),
    }),

    getAllProfiles: builder.query({
      query: () => `profiles/`,
    }),

    getUserProfiles: builder.query<
      {
        profiles: IProfile[];
        totalProfiles: number;
        totalPages: number;
        currentPage: number;
      },
      { userId: string; page: number; limit: number, searchFilter: string, filterType: FILTERS | null }
    >({
      query: ({ userId, page, limit, searchFilter, filterType }) => ({
        url: `profiles/${userId}`,
        params: { page, limit, searchFilter,  filterType },
      }),
    }),

    addProfile: builder.mutation({
      query: ({ profile, userToken }) => ({
        url: `profiles/${userToken}`,
        method: "POST",
        body: profile,
      }),
    }),

    updateProfile: builder.mutation({
      query: ({ userToken, profileId, profile }) => ({
        url: `profiles/${userToken}/${profileId}`,
        method: "PUT",
        body: profile,
      }),
    }),

    deleteProfile: builder.mutation({
      query: ({ profileId, userToken }) => ({
        url: `profiles/${userToken}/${profileId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetUserProfilesQuery,
  useGetUserByTokenQuery,
  useCreateUserMutation,
  useAddProfileMutation,
  useDeleteProfileMutation,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useEditUserMutation,
} = usersApi;
