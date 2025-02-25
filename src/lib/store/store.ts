import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { avatarApi, signInApi, usersApi } from "@/lib/api/users";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [avatarApi.reducerPath]: avatarApi.reducer,
    [signInApi.reducerPath]: signInApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(avatarApi.middleware)
      .concat(signInApi.middleware),
});

setupListeners(store.dispatch);
