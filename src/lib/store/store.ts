import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersApi } from "@/lib/api/usersApi";
import { signinApi } from "@/lib/api/signinApi";
import { avatarApi } from "@/lib/api/avatarApi";
import { userSlice } from "@/lib/slice/userSlice";
import { authSlice } from "@/lib/slice/authSlice";
import { userForEditSlice } from "@/lib/slice/userForEditSlice";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [avatarApi.reducerPath]: avatarApi.reducer,
    [signinApi.reducerPath]: signinApi.reducer,
    user: userSlice.reducer,
    auth: authSlice.reducer,
    userForEdit: userForEditSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(avatarApi.middleware)
      .concat(signinApi.middleware),
});

setupListeners(store.dispatch);
