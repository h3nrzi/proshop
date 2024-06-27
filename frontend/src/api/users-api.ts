import apiSlice from "../store/api-slice";
import { UserInfo } from "../types/Auth";
import { USERS_URL } from "../utils/constants";

interface ResponseData {
  Login: UserInfo;
  Register: UserInfo;
  Logout: { message: string };
}

interface RequestData {
  Register: { name: string; email: string; password: string };
  Login: { email: string; password: string };
  UpdateProfile: UserInfo;
}

const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ResponseData["Login"], RequestData["Login"]>({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = usersApi;
