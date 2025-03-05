import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const avatarApi = createApi({
  reducerPath: "avatarApi",
  baseQuery: fetchBaseQuery({ baseUrl: `` }),
  endpoints: (builder) => ({
    addAvatar: builder.mutation({
      query: ({ avatar }) => ({
        url: `/api/avatar/upload?filename=${avatar.name}`,
        method: "POST",
        body: avatar,
      }),
    }),
  }),
});
export const { useAddAvatarMutation } = avatarApi;
