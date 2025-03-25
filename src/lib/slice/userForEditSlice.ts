import { IUser } from "@/types/IUser";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: IUser | null;
}

const initialState: UserState = {
  user: null,
};

export const userForEditSlice = createSlice({
  name: "userForEdit",
  initialState,
  reducers: {
    setUserForEdit: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});

export const { setUserForEdit } = userForEditSlice.actions;
