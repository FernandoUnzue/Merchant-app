//cashback redemption endpoints

import {
  CashbackRedemptionBody,
  CashbackRedemptionFilters,
  CashbackRedemptionResponse,
  FiltersPresents,
  PresentBody,
  PresentsResponse,
  RespPaginated,
} from '@core/interfaces';
import { ApiRedux } from '../api';

export const extendedApiCashbackRedemption = ApiRedux.injectEndpoints({
  endpoints: build => ({
    getCashbackRedemption: build.query<
      RespPaginated<CashbackRedemptionResponse>,
      CashbackRedemptionFilters
    >({
      query: args => ({
        url: '/api/member/cashback-redemption/list',
        params: args,
      }),
      providesTags: ['CashbackRedemption'],
    }),
    reloadCashbackRedemption: build.mutation<null, void>({
      queryFn: () => ({ data: null }),
      invalidatesTags: ['CashbackRedemption'],
    }),
    newCashbackRedemption: build.mutation<void, CashbackRedemptionBody>({
      query: args => ({
        url: '/api/member/cashback-redemption',
        method: 'POST',
        body: args,
      }),
      invalidatesTags: ['CashbackRedemption'],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetCashbackRedemptionQuery,
  useReloadCashbackRedemptionMutation,
  useNewCashbackRedemptionMutation,
} = extendedApiCashbackRedemption;
