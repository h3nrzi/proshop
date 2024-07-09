import apiSlice from "../store/api-slice";
import { UserInfo } from "../types/Auth";
import { USERS_URL } from "../utils/constants";

interface Req {
  Register: { name: string; email: string; password: string };
  Login: { email: string; password: string };
  UpdateProfile: { name: string; email: string; password: string };
}

interface Res {
  Login: UserInfo;
  Register: UserInfo;
  Logout: { message: string };
  UpdateProfile: UserInfo;
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

    login: builder.mutation<Res["Login"], Req["Login"]>({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation<Res["Logout"], void>({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    updateProfile: builder.mutation<Res["UpdateProfile"], Req["UpdateProfile"]>({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
} = usersApi;
