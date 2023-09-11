import { combineReducers } from 'redux';
import { ApiRedux } from '../Api/api';
import { AuthSlice } from '../authSlice/authSlice';
import { CustomerSlice } from '../customerSlice';
import { ThemeSlice } from '../themeSlice';

export const rootReducer = combineReducers({
  auth: AuthSlice.reducer,
  theme: ThemeSlice.reducer,
  customer: CustomerSlice.reducer,
  Querys: ApiRedux.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
