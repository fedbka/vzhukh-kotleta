import { createSelector, createSlice } from "@reduxjs/toolkit";
import { TUserState } from "../../types/types.ts";
import { authApi } from "../api/auth.ts";
import { eraseTokens, setTokens } from "../utils/tokens.ts";

const initialState: TUserState = {
  name: "",
  email: "",
  isAuthenticated: false,
  isRecoveringPassword: false,
  isPasswordRecovered: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.refreshToken.matchFulfilled,
      (state, action) => {
        state.isAuthenticated = true;
        setTokens({
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        });
      }
    );

    builder.addMatcher(
      authApi.endpoints.getUser.matchFulfilled,
      (state, action) => {
        state.isAuthenticated = true;
        state.name = action.payload.user?.name ?? "";
        state.email = action.payload.user?.email ?? "";        
      }
    );    

    builder.addMatcher(
      authApi.endpoints.loginUser.matchFulfilled,
      (state, action) => {
        state.name = action.payload.user?.name ?? "";
        state.email = action.payload.user?.email ?? "";
        state.isAuthenticated = true;
        setTokens({
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        });
      }
    );

    builder.addMatcher(authApi.endpoints.logoutUser.matchFulfilled, (state) => {
      state.name = "";
      state.email = "";
      state.isAuthenticated = false;
      eraseTokens();
    });

    builder.addMatcher(
      authApi.endpoints.resetPassword.matchFulfilled,
      (state) => {
        state.isRecoveringPassword = true;
        state.isPasswordRecovered = false;
      }
    );

    builder.addMatcher(
      authApi.endpoints.recoveryPassword.matchFulfilled,
      (state) => {
        state.isRecoveringPassword = false;
        state.isPasswordRecovered = true;
      }
    );

    builder.addMatcher(
      authApi.endpoints.updateUser.matchFulfilled,
      (state, action) => {
        state.name = action.payload.user?.name ?? state.name;
        state.email = action.payload.user?.email ?? state.email;
      }
    );
  },
  selectors: {
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectIsRecoveringPassword: (state) => state.isRecoveringPassword,
    selectIsPasswordRecovered: (state) => state.isPasswordRecovered,
    selectUserName: (state) => state.name,
    selectUserEmail: (state) => state.email,
  },
});

export const selectUser = createSelector(
  [userSlice.selectors.selectUserName, userSlice.selectors.selectUserEmail],
  (name, email) => ({ name, email })
);

export const {
  selectIsAuthenticated,
  selectIsRecoveringPassword,
  selectIsPasswordRecovered,
} = userSlice.selectors;
