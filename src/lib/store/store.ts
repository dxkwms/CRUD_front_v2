import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersApi } from "@/lib/api/usersApi";
import { signInApi } from "@/lib/api/signInApi";
import { avatarApi } from "@/lib/api/avatarApi";

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
