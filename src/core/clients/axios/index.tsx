import axios, { AxiosRequestConfig } from 'axios';
import { API_URL } from 'react-native-dotenv';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import * as Keychain from 'react-native-keychain';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// TODO: refactor a test refresh token, add user reducer logic

// const getAccessToken = async () => {
//   try {
//     const credentials = await Keychain.getGenericPassword();
//     if (credentials) {
//       const jwt = JSON.parse(credentials.password);
//       console.log('access token', jwt.accessToken);
//       return jwt.accessToken;
//     }
//   } catch (error) {
//     console.log({ error });
//   }
//   return '';
// };

// const getRefreshToken = async () => {
//   try {
//     const credentials = await Keychain.getGenericPassword();
//     if (credentials) {
//       const jwt = JSON.parse(credentials.password);
//       console.log('refresh token', jwt.refreshToken);
//       return jwt.refreshToken;
//     }
//   } catch (error) {
//     console.log({ error });
//   }
//   return '';
// };

// axiosInstance.interceptors.request.use(
//   async (config: AxiosRequestConfig) => {
//     const token = await getAccessToken();

//     if (token) {
//       config.headers = config.headers ?? {};
//       config.headers.Authorization = `Bearer ${token}`;
//       console.log('headers', { config });
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   },
// );

// axios.interceptors.response.use(
//   response => response,
//   async error => {
//     const config = error?.config;
//     console.log(error);

//     if (
//       error?.response?.status === 401 &&
//       error?.response?.status === 404 &&
//       !config?.sent
//     ) {
//       config.sent = true;

//       const accessToken = await refreshAuthLogic();

//       if (accessToken) {
//         config.headers = {
//           ...config.headers,
//           Authorization: `Bearer ${accessToken}`,
//         };
//       }

//       return config;
//     }
//     return Promise.reject(error);
//   },
// );

// const refreshAuthLogic = async (): Promise<any> => {
//   console.log('failedRequest');

//   const token = await getRefreshToken();

//   if (token) {
//     return token;
//   }

//   const options = {
//     baseURL: API_URL,
//     url: '/api/token/refresh',
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   try {
//     const tokenRefreshResponse = await axios(options);

//     // tokenRefreshResponse.config.headers.Authorization = `Bearer ${tokenRefreshResponse.data.access_token}`;

//     //   authContext.setAuthState({
//     //     ...authContext.authState,
//     //     accessToken: tokenRefreshResponse.data.access_token,
//     //   });

//     await Keychain.setGenericPassword(
//       'token',
//       JSON.stringify({
//         accessToken: tokenRefreshResponse.data.access_token,
//         refreshToken: tokenRefreshResponse.data.refresh_token,
//       }),
//     );

//     // return Promise.resolve();

//     return tokenRefreshResponse.data.access_token;
//   } catch (e) {
//     //   authContext.setAuthState({
//     //     accessToken: null,
//     //     refreshToken: null,
//     //   });
//     console.log({ e });
//     return Promise.resolve();
//   }
// };
// createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic, {});

export default axiosInstance;
