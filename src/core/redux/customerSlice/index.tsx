import { createSlice } from '@reduxjs/toolkit';

interface userInfo {
  name: string;
  lastName: string;
  phone: string;
  province: string;
}

interface CustomerProps {
  card: number | null;
  registered: boolean;
  amount: number | null;
  userInfo: userInfo | null;
}

const initialState = {
  card: null,
  registered: false,
  amount: null,
  userInfo: null,
} as CustomerProps;

export const CustomerSlice = createSlice({
  name: 'customer',
  initialState: initialState,
  reducers: {
    setUserTest: state =>
      (state = {
        card: 100329,
        registered: true,
        amount: 100,
        userInfo: {
          name: 'Julio',
          lastName: 'Colombo',
          phone: '32323232',
          province: 'Firenze',
        },
      }),

    removeCustomer: state => (state = initialState),
  },
});

export const { setUserTest, removeCustomer } = CustomerSlice.actions;
