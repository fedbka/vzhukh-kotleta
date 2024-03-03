import {
  TGetUserResponce,
  TLoginUserRequest,
  TLoginUserResponse,
  TLogoutUserResponse,
  TRecoveryPasswordRequest,
  TRecoveryPasswordResponse,
  TRefreshTokenResponce,
  TRegisterUserRequest,
  TRegisterUserResponse,
  TResetPasswordRequest,
  TResetPasswordResponse,
  TUpdateUserRequest,
  TUpdateUserResponse,
} from "../../types/types.ts";
import { getTokens } from "../utils/tokens.ts";
import { api } from "./api.ts";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation<TLoginUserResponse, unknown>({
      query: ({ email, password }: TLoginUserRequest) => ({
        url: "auth/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    logoutUser: build.mutation<TLogoutUserResponse, unknown>({
      query: () => {
        const { refreshToken } = getTokens();
        return {
          url: "auth/logout",
          method: "POST",
          body: { token: refreshToken },
        };
      },
    }),
    resetPassword: build.mutation<TResetPasswordResponse, unknown>({
      query: ({ email }: TResetPasswordRequest) => ({
        url: "password-reset",
        method: "POST",
        body: { email },
      }),
    }),
    recoveryPassword: build.mutation<TRecoveryPasswordResponse, unknown>({
      query: ({ password, token }: TRecoveryPasswordRequest) => ({
        url: "password-reset/reset",
        method: "POST",
        body: { password, token },
      }),
    }),
    registerUser: build.mutation<TRegisterUserResponse, unknown>({
      query: ({ email, name, password }: TRegisterUserRequest) => ({
        url: "auth/register",
        method: "POST",
        body: { name, email, password },
      }),
    }),
    updateUser: build.mutation<TUpdateUserResponse, unknown>({
      query: ({ email, name, password }: TUpdateUserRequest) => {
        const { accessToken } = getTokens();
        return {
          url: "auth/user",
          method: "PATCH",
          body: { name, email, password },
          headers: {
            Authorization: accessToken,
          },
        };
      },
    }),
    refreshToken: build.mutation<TRefreshTokenResponce, unknown>({
      query: () => {
        const { refreshToken } = getTokens();
        return {
          url: "auth/token",
          method: "POST",
          body: { token: refreshToken },
        };
      },
    }),
    getUser: build.query<TGetUserResponce, unknown>({
      query: () => {
        const { accessToken } = getTokens();
        return {
          url: "auth/user",
          headers: {
            Authorization: accessToken,
          },
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useResetPasswordMutation,
  useRecoveryPasswordMutation,
  useLogoutUserMutation,
  useUpdateUserMutation,
  useGetUserQuery,
  useRefreshTokenMutation,
} = authApi;
