//merchants endpoints

import {
  CategoriesMerchant,
  FiltersMerchant,
  HomeShopsResp,
  Merchant,
  MerchatnDetail,
  RespMerchantList,
  SearchShop,
} from '@core/interfaces';
import { ApiRedux } from '../api';

export const extendedApiMerchant = ApiRedux.injectEndpoints({
  endpoints: build => ({
    getMerchants: build.query<RespMerchantList, FiltersMerchant>({
      query: args => ({
        url: '/merchant/list',
        params: args,
      }),
      providesTags: ['Merchant'],
    }),
    getMerchatById: build.query<MerchatnDetail, { id: string }>({
      query: body => ({
        url: `/merchant/data/${body.id}`,
      }),
      providesTags: ['Merchant'],
    }),
    reloadMerchants: build.mutation<null, void>({
      queryFn: () => ({ data: null }),
      invalidatesTags: ['Merchant'],
    }),
    getCategoriesList: build.query<Array<CategoriesMerchant>, void>({
      query: () => ({
        url: '/merchant/category/list',
      }),
    }),
    searchShops: build.query<
      Array<SearchShop>,
      { word: string; quantity: string }
    >({
      query: body => ({
        url: `/merchant/search/${body.word}/${body.quantity}`,
      }),
    }),
    getHomeShop: build.query<Array<HomeShopsResp>, { shopQuantity: string }>({
      query: body => ({
        url: '/merchant/cashback/list',
        params: body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetHomeShopQuery,
  useSearchShopsQuery,
  useGetCategoriesListQuery,
  useGetMerchatByIdQuery,
  useGetMerchantsQuery,
  useReloadMerchantsMutation,
} = extendedApiMerchant;
