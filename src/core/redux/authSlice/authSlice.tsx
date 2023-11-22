import { GetOpInfoResponse, ProfileResponse } from '@core/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiRedux } from '../Api/api';
import { extendedApiAuth } from '../Api/endpoints/Auth';
import { extendedApiUser } from '../Api/endpoints/User';
import { store } from '../store';
import { extendedApiWebpos } from '../Api/endpoints/Webpos';

export const LogOut = createAction('auth/logOut');

export const LogOutAsync = createAsyncThunk('auth/logoutasyc', async () => {
  // await AsyncStorage.removeItem('@user');
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('refresh_token');
  store.dispatch(ApiRedux.util.resetApiState());
  console.log('log out');
});

export const LogOutExternal = () => {};

interface AuthProps {
  operatorInfo: GetOpInfoResponse | null;
  user: string | null;
  userData: ProfileResponse | null;
  checking: boolean;
  loggedIn: boolean;
  showModal: boolean;
  darkMode: boolean;
}

const initialState = {
  operatorInfo: null,
  user: null,
  loggedIn: false,
  checking: true,
  showModal: false,
  darkMode: false,
} as AuthProps;

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    openModal: state => {
      state.showModal = true;
    },
    closeModal: state => {
      state.showModal = false;
    },
    toggleModal: state => {
      state.showModal = !state.showModal;
    },
  },
  extraReducers: builder => {
    builder.addCase(LogOut, state => {
      //  AsyncStorage.removeItem('@user');
      //  AsyncStorage.removeItem('@token');
      state.user = null;
      state.checking = false;
      state.loggedIn = false;
    });
    builder.addCase(LogOutAsync.fulfilled, state => {
      state.user = null;
      state.checking = false;
      state.loggedIn = false;
    });
    builder.addCase(LogOutAsync.pending, state => {
      //
      state.checking = true;
    });
    builder.addCase(LogOutAsync.rejected, state => {});
    builder.addMatcher(
      extendedApiAuth.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.checking = false;
        state.user = payload.access_token;
        state.loggedIn = true;
      },
    );
    builder.addMatcher(
      extendedApiUser.endpoints.getUserProfile.matchPending,
      state => {
        state.checking = true;
      },
    );
    builder.addMatcher(
      extendedApiUser.endpoints.getUserProfile.matchRejected,
      state => {
        state.checking = false;
      },
    );
    builder.addMatcher(
      extendedApiUser.endpoints.getUserProfile.matchFulfilled,
      (state, { payload }) => {
        state.userData = payload;
        state.checking = false;
      },
    );
    builder.addMatcher(extendedApiAuth.endpoints.login.matchPending, state => {
      state.checking = true;
    });
    builder.addMatcher(extendedApiAuth.endpoints.login.matchRejected, state => {
      state.user = null;
      state.checking = false;
      state.loggedIn = false;
    });
    builder.addMatcher(
      extendedApiAuth.endpoints.register.matchFulfilled,
      state => {
        state.checking = false;
      },
    );
    builder.addMatcher(
      extendedApiAuth.endpoints.register.matchPending,
      state => {
        state.checking = true;
      },
    );
    builder.addMatcher(
      extendedApiAuth.endpoints.register.matchRejected,
      state => {
        state.checking = false;
      },
    );
    builder.addMatcher(
      extendedApiAuth.endpoints.checkAuth.matchPending,
      state => {
        state.checking = true;
      },
    );
    builder.addMatcher(
      extendedApiAuth.endpoints.checkAuth.matchRejected,
      state => {
        store.dispatch(LogOutAsync());
        store.dispatch(AuthSlice.actions.openModal());
        state.user = null;
        state.checking = false;
        state.loggedIn = false;
      },
    );
    builder.addMatcher(
      extendedApiAuth.endpoints.checkAuth.matchFulfilled,
      (state, { payload }) => {
        //
        // state.user = payload.data.user;
        state.checking = false;
        state.loggedIn = true;
      },
    );
    builder.addMatcher(
      extendedApiAuth.endpoints.refreshTokenFunc.matchRejected,
      state => {
        store.dispatch(LogOutAsync());
        store.dispatch(AuthSlice.actions.openModal());
        state.user = null;
        state.checking = false;
        state.loggedIn = false;
      },
    );
    builder.addMatcher(
      extendedApiWebpos.endpoints.getOperatorInfo.matchFulfilled,
      (state, { payload }) => {
        state.operatorInfo = payload;
        state.checking = false;
      },
    );
    builder.addMatcher(
      extendedApiWebpos.endpoints.getOperatorInfo.matchPending,
      state => {
        state.checking = true;
      },
    );
    builder.addMatcher(
      extendedApiWebpos.endpoints.getOperatorInfo.matchRejected,
      state => {
        state.checking = false;
      },
    );
  },
});
