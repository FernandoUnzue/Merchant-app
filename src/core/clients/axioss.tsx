/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import { refresToken, tokeeeen } from '@core/helpers/utils';
import { ApiRedux } from '@core/redux/Api/api';
import { AuthSlice, LogOutAsync } from '@core/redux/authSlice/authSlice';
import { AppDispatch, store } from '@core/redux/store';
import { XMLresp } from '@modules/unlogged/login/screens/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { encode } from 'base-64';
import {
  API_URL,
  BASIC_AUTH_PASSWORD,
  BASIC_AUTH_USERNAME,
} from 'react-native-dotenv';

const baseUrl = API_URL;

interface ApiProps {
  endpoint: string;
  method?: string;
  _data?: any;
  tokenUse?: boolean;
  params?: any;
  urlParams?: number | string;
  baseUrlNew?: string;
  urlEncoded?: boolean;
  auth?: boolean;
  formData?: boolean;
}

export const Api = ({
  endpoint,
  method = 'GET',
  _data = {},
  tokenUse = false,
  params = {},
  urlParams = '',
  baseUrlNew = '',
  urlEncoded = false,
  auth = false,
  formData = false,
}: ApiProps) => {
  const instance = axios.create({
    baseURL: baseUrlNew !== '' ? baseUrlNew : baseUrl,
    method: method,
    responseType: 'json',
    headers: {
      'Content-Type': formData ? 'multipart/form-data' : 'application/json',
    },
  });

  instance.interceptors.request.use(
    async config => {
      const token = await AsyncStorage.getItem('token');
      //  console.log(token);
      if (token) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${token}`,
        };
      }
      if (auth) {
        config.headers = {
          ...config.headers,
          autorization: `Basic ${encode(
            BASIC_AUTH_USERNAME + ':' + BASIC_AUTH_PASSWORD,
          )}`,
        };
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    function (response) {
      console.log('response31', response);

      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    async error => {
      //  console.log('error', error);

      const originalRequest = error.config;
      //   console.log('axios error: ' + error.response.data.error);
      if (
        //  error.response.status === 401 &&
        !originalRequest._retry &&
        error.response.data.error === 'invalid_token'
      ) {
        console.log('axios error invalid token: ' + error.response.data);
        originalRequest._retry = true;
       
         
        //  store.dispatch(ApiRedux.endpoints.refreshTokenFunc.initiate({grant_type: 'refresh_token', refresh_token: access_token}));
          //  await AsyncStorage.removeItem('refresh_token');
         {/* originalRequest.headers = {
            ...originalRequest.headers,
            authorization: `Bearer ${access_token}`,
          };*/}
          console.log('TOKEN REFRESH TRY');
          refresToken()

        return instance.request(originalRequest);
      } else if (
        error.response.status === 401 &&
        error.response.data.error === 'invalid_token'
      ) {
        store.dispatch(LogOutAsync());
        store.dispatch(AuthSlice.actions.openModal());
      }
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    },
  );

  return instance.request({
    data: Object.keys(_data).length !== 0 ? _data : undefined,
    params: Object.keys(params).length !== 0 ? params : undefined,
    url: urlParams ? `${endpoint}/${urlParams}` : endpoint,
  });
};

export const fetchApi = async ({
  endpoint,
  method = 'GET',
  _data = {},
  auth = false,
  formData = false,
  tokenUse = false,
}: ApiProps) => {
  const token = await AsyncStorage.getItem('token');

  const xhr = new XMLHttpRequest();

  return new Promise<any>((resolve, reject) => {
    xhr.onreadystatechange = e => {
      if (xhr.readyState !== 4) {
        return;
      }
    

      if (xhr.status === 200) {
        resolve(xhr);
      } else {
        reject(xhr);
      }
    };
    
    xhr.open(method, baseUrl + endpoint);
  
    xhr.setRequestHeader(
      'Authorization',
      tokenUse && token
        ? `Bearer ${token}`
        : `Basic ${encode(BASIC_AUTH_USERNAME + ':' + BASIC_AUTH_PASSWORD)}`,
    );
    xhr.setRequestHeader(
      'Content-Type',
      formData ? 'multipart/form-data' : 'application/json',
    );
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send(_data);
  });
};
