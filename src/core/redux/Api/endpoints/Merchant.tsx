//merchant endpoints

import {
  Coupon,
  FiltersMerchant,
  HomeGiftCardResp,
  HomeShopsResp,
  Ifavorites,
  RespMerchantList,
  SearchShop,
} from '@core/interfaces';
import { ApiRedux } from '../api';

export const extendedApiMerchant = ApiRedux.injectEndpoints({
  endpoints: build => ({
    burnCoupon: build.mutation<{ message: string }, { merchantFNId: number }>({
      query: body => ({
        url: `/merchant/coupon/${body.merchantFNId.toString()}/burn`,
        method: 'PUT',
      }),
      invalidatesTags: ['Merchant'],
    }),
    getOfferCoupon: build.query<Coupon, { offerId: string }>({
      query: body => ({
        url: `/merchant/offer-coupon/${body.offerId}`,
      }),
      providesTags: ['Merchant'],
    }),
  }),

  overrideExisting: false,
});

export const { useGetOfferCouponQuery, useBurnCouponMutation } =
  extendedApiMerchant;
