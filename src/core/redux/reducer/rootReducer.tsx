import { combineReducers } from 'redux';
import { ApiRedux } from '../Api/api';
import { AuthSlice } from '../authSlice/authSlice';

export const rootReducer = combineReducers({
  auth: AuthSlice.reducer,
  Querys: ApiRedux.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
