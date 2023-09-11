import { createSlice } from '@reduxjs/toolkit';

interface userInfo {
  name: string;
  lastName: string;
  phone: string;
  province: string;
}

interface CustomerProps {
  card: number;
  amount: number;
  userInfo: userInfo;
}

const initialState = {
  card: 0,
  amount: 0,
  userInfo: {
    name: '',
    lastName: '',
    phone: '',
    province: '',
  },
} as CustomerProps;

export const CustomerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
});
