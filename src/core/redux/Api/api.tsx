import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './basquery';

// API
export const ApiRedux = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Auth',
    'User',
    'Movement',
    'Merchant',
    'Notifications',
    'Tickets',
    'GiftCard',
    'Favorites',
    'Presents',
    'CashbackRedemption',
  ],
  reducerPath: 'Querys',
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
