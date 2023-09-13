import { ProfileResponse } from '@core/interfaces';
import { createSlice } from '@reduxjs/toolkit';
import { string } from 'yup';
import { number } from 'yup/lib/locale';
import { extendedApiUser } from '../Api/endpoints/User';

interface CustomerProps {
  card: number | null;
  loading: boolean;
  registered: boolean;
  amount: number | null;
  userInfo: ProfileResponse | null;
}

const initialState = {
  card: null,
  loading: false,
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
        loading: false,
        amount: 100,
        userInfo: {
          first_name: 'Julio',
          last_name: 'Colombo',
          email: 'esteban.burgos@capstoneside.com',
          birth_date: '13/05/1982',
          username: '+5492235953896',
          card: '100329',
          category_id: 1,
          cap_id: 1,
          privacy_mkt: 1,
          privacy_analysis_data: 0,
          privacy_third_partner: 1,
          fnet_customer_id: 463455,
          best_customer_id: 79086,
          friend_id: 0,
          status: 2,
          email_bs: 'unzuef2630@gmail.com',
          avatar_photo:
            'https://miaws3.s3.eu-south-1.amazonaws.com/user_avatar_9193832571832356866avatar.png',
          gender: 'M',
          province_code: 'AV',
          balance: {
            balanceId: 15459,
            userId: 6673,
            pointsCharged: 2556.55,
            pointsUsed: 2459.46,
            balancePoints: 97.09000000000015,
            pointsChargedCount: 0,
            pointsUsedCount: 0,
            cashbackCharged: 0,
            cashbackUsed: 0,
            cashbackPending: 0,
            totalMoneyInSale: 0,
            paidMoneyInSale: 0,
            kycDigitale: null,
            bankBalance: 0,
            invitorCode: 'SKUY7X',
            updatedAt: '12/09/2023 15:23:39',
          },
          enabledEmail: true,
          email_old: null,
          oneSignalId: '+5492235953896',
          updated_at: '31/07/2023 18:37:59',
        },
      }),

    removeCustomer: state => (state = initialState),
  },
  extraReducers: builder => {
    builder.addMatcher(
      extendedApiUser.endpoints.getMemberByCard.matchPending,
      state => {
        state.loading = true;
      },
    );
    builder.addMatcher(
      extendedApiUser.endpoints.getMemberByCard.matchRejected,
      state => {
        state.userInfo = null;
        state.loading = false;
        state.registered = false;
        state.amount = null;
        state.card = null;
      },
    );
    builder.addMatcher(
      extendedApiUser.endpoints.getMemberByCard.matchFulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.card = Number(payload.card);
        state.amount = Number(payload.balance.balancePoints);
        state.userInfo = payload;
        state.registered = true;
      },
    );
  },
});

export const { setUserTest, removeCustomer } = CustomerSlice.actions;
