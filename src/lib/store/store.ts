import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersApi } from "@/lib/api/usersApi";
import { signInApi } from "@/lib/api/signInApi";
import { avatarApi } from "@/lib/api/avatarApi";
import { userSlice } from "@/lib/slice/userSlice";
import { authSlice } from "@/lib/slice/authSlice";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [avatarApi.reducerPath]: avatarApi.reducer,
    [signInApi.reducerPath]: signInApi.reducer,
    user: userSlice.reducer,
    auth: authSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(avatarApi.middleware)
      .concat(signInApi.middleware),
});

setupListeners(store.dispatch);
