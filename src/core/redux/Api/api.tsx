import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './basquery';

// API
export const ApiRedux = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Auth',
    'User',
    'Movement',
    'Coupon',
    'Notifications',
    'Tickets',
    'GiftCard',
    'Favorites',
    'Presents',
    'CashbackRedemption',
    'Merchant',
  ],
  reducerPath: 'Querys',
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
