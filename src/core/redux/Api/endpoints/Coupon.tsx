//merchant endpoints

import {
  Coupon,
  CouponBuy,
  FiltersMerchant,
  HomeGiftCardResp,
  HomeShopsResp,
  Ifavorites,
  RespMerchantList,
  RespPaginated,
  SearchShop,
} from '@core/interfaces';
import { ApiRedux } from '../api';

export const extendedApiCoupon = ApiRedux.injectEndpoints({
  endpoints: build => ({
    burnCoupon: build.mutation<{ message: string }, { exchangeCode: number }>({
      query: body => ({
        url: `/merchant/coupon/${body.exchangeCode.toString()}/burn`,
        method: 'PUT',
        responseHandler: 'text',
      }),
      invalidatesTags: ['Coupon'],
    }),
    getCouponByEC: build.query<
      RespPaginated<CouponBuy>,
      { exchangeCode: number }
    >({
      query: body => ({
        url: '/merchant/offer-coupon/buy',
        params: { filter: `exchangeCode,${body.exchangeCode}` },
      }),
      providesTags: ['Coupon'],
    }),
    getOfferCoupon: build.query<Coupon, { offerId: string }>({
      query: body => ({
        url: `/merchant/offer-coupon/${body.offerId}`,
      }),
      providesTags: ['Coupon'],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetOfferCouponQuery,
  useBurnCouponMutation,
  useGetCouponByECQuery,
} = extendedApiCoupon;
