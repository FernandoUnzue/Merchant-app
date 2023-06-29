import { refresToken } from "@core/helpers/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseQueryFn, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { Mutex } from "async-mutex";
import { encode } from "base-64";
import { API_URL, BASIC_AUTH_PASSWORD, BASIC_AUTH_USERNAME } from "react-native-dotenv";
import { LogOutAsync } from "../authSlice/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async (headers, { getState, endpoint })=> {
      const suscription_key = await AsyncStorage.getItem('token');
      const key = suscription_key ? suscription_key : undefined;
      const token = key;
      console.log(`token from basequery: ${token}`)
      if (token && endpoint !== 'refreshTokenFunc' && endpoint !== 'login') {
        headers.set('Authorization', `Bearer ${token} `);
      } else {
        headers.set(
          'Authorization',
          `Basic ${encode(BASIC_AUTH_USERNAME + ':' + BASIC_AUTH_PASSWORD)} `,
        );
      }
  
      return headers;
    },
  });
  
  export type ErrorAny =
    | {
        /**
         * * `number`:
         *   HTTP status code
         */
        status: number;
        data: any;
      }
    | {
        /**
         * * `"FETCH_ERROR"`:
         *   An error that occurred during execution of `fetch` or the `fetchFn` callback option
         **/
        status: 'FETCH_ERROR';
        data?: undefined;
        error: string;
      }
    | {
        /**
         * * `"PARSING_ERROR"`:
         *   An error happened during parsing.
         *   Most likely a non-JSON-response was returned with the default `responseHandler` "JSON",
         *   or an error occurred while executing a custom `responseHandler`.
         **/
        status: 'PARSING_ERROR';
        originalStatus: number;
        data: string;
        error: string;
      }
    | {
        /**
         * * `"CUSTOM_ERROR"`:
         *   A custom error type that you can return from your `queryFn` where another error might not make sense.
         **/
        status: 'CUSTOM_ERROR';
        data?: any;
        error: string;
      };
  const mutex = new Mutex();
 export  const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    ErrorAny
  > = async (args, api, extraOptions) => {
    {
      /*  if (result.error && result.error.status === 401) {
      // try to get a new token
      console.log('error basquery: ' + result.error.data.error);
      const refreshResult = await AsyncStorage.getItem('refresh_token');
      if (refreshResult) {
        // store the new token
        console.log('refresh token');
        await AsyncStorage.mergeItem('token', refreshResult);
        // retry the initial query
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(LogOutAsync());
      }
    }*/
    }
    // new implementation
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    if ((result.error?.data as any)?.error === 'invalid_token' && result.error?.status === 401) {
      console.log('rtk query catch invalid token error');
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
  
        try {
          const refreshResult = await AsyncStorage.getItem('refresh_token');
  
          if (refreshResult) {
            refresToken();
            result = await baseQuery(args, api, extraOptions);
          } else {
            api.dispatch(LogOutAsync());
           // api.dispatch(AuthSlice.actions.openModal());
          }
        } finally {
          // release must be called once the mutex should be released again.
          release();
        }
      } else {
        // wait until the mutex is available without locking it
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
    }
    return result;
  };