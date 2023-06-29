import { toFormData } from "@core/helpers/utils";
import { CheckAuthProps, CreateUserResp, LoginProps, LoginResp, RegisterStep1Body } from "@core/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiRedux } from "../api";

// auth endpoints
export const extendedApiAuth = ApiRedux.injectEndpoints({
    endpoints: build => ({
        login: build.mutation<LoginResp, LoginProps>({
          query: (body: LoginProps) => ({
            url: '/oauth/token',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            method: 'POST',
            body: toFormData(body),
          }),
          transformResponse: async (response: LoginResp) => {
            // await AsyncStorage.setItem('@user', JSON.stringify(response.data.user));
            await AsyncStorage.setItem('token', response.access_token);
            await AsyncStorage.setItem('refresh_token', response.refresh_token);
            return response;
          },
        }),
        register: build.mutation<CreateUserResp, RegisterStep1Body>({
          query: (body: RegisterStep1Body) => ({
            url: '/api/register',
            method: 'POST',
            body,
          }),
        }),
        checkAuth: build.mutation<CheckAuthProps, {token: string | null}>({
          query: (body) =>({ 
            url:'/oauth/check_token',
            params: body,
            method: 'POST'
          }),
        }),
        refreshTokenFunc: build.mutation<LoginResp, LoginProps>({
          query: (body: LoginProps) => ({
            url: '/oauth/token',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            method: 'POST',
            body: toFormData(body),
          }),
          transformResponse: async (response: LoginResp) => {
            // await AsyncStorage.setItem('@user', JSON.stringify(response.data.user));
            await AsyncStorage.setItem('token', response.access_token);
            await AsyncStorage.setItem('refresh_token', response.refresh_token);
            return response;
          },
        }),
      }),
      overrideExisting: false,
});

export const {
    useRefreshTokenFuncMutation,
    useLoginMutation,
    useRegisterMutation,
    useCheckAuthMutation,
  } = extendedApiAuth;