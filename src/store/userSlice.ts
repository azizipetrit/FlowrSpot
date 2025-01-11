import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";
import { RootState } from ".";

export interface UserState {
  isLoggedIn: boolean;
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  sightingsNum: number;
  pictureUrl: string;
  accessToken: string;
  refreshToken: string;
}

const initialState: UserState = {
  isLoggedIn: false,
  id: "",
  email: "",
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  sightingsNum: 0,
  pictureUrl: "",
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
      state.id = "";
      state.email = "";
      state.firstName = "";
      state.lastName = "";
      state.dateOfBirth = "";
      state.sightingsNum = 0;
      state.pictureUrl = "";
      state.accessToken = "";
      state.refreshToken = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.dateOfBirth = action.payload.dateOfBirth;
      state.sightingsNum = action.payload.sightingsNum;
      state.pictureUrl = action.payload.pictureUrl;
    });
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
