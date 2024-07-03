import apiSlice from "../store/api-slice";
import { UserInfo } from "../types/Auth";
import { USERS_URL } from "../utils/constants";

interface ResponseData {
  Login: UserInfo;
  Register: UserInfo;
  Logout: { message: string };
  UpdateProfile: UserInfo;
}

interface RequestData {
  Register: { name: string; email: string; password: string };
  Login: { email: string; password: string };
  UpdateProfile: { name: string; email: string; password: string };
}

const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<ResponseData["Register"], RequestData["Register"]>({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation<ResponseData["Login"], RequestData["Login"]>({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation<ResponseData["Logout"], void>({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    updateProfile: builder.mutation<ResponseData["UpdateProfile"], RequestData["UpdateProfile"]>({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useUpdateProfileMutation } =
  usersApi;
