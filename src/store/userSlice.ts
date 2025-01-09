import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import { RootState } from ".";

interface UserState {
  isLoggedIn: boolean;
  name: string;
  profileImage: string;
  accessToken: string;
  refreshToken: string;
}

const initialState: UserState = {
  isLoggedIn: false,
  name: "",
  profileImage: "",
  accessToken: "",
  refreshToken: "",
};

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { accessToken } = state.user;

    try {
      const response = await api.get("/account/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      console.error("Failed to fetch user info", error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      state.isLoggedIn = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.name = "";
      state.profileImage = "";
      state.accessToken = "";
      state.refreshToken = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.name = `${action.payload.firstName} ${action.payload.lastName}`;
      state.profileImage = action.payload.pictureUrl;
    });
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
