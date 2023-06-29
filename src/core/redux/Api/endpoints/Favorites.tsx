//favorites endpoints

import {
  FiltersMerchant,
  HomeGiftCardResp,
  HomeShopsResp,
  Ifavorites,
  RespMerchantList,
  SearchShop,
} from '@core/interfaces';
import { ApiRedux } from '../api';

export const extendedApiFavorites = ApiRedux.injectEndpoints({
  endpoints: build => ({
    setFavorite: build.mutation<{ message: string }, { shopId: number }>({
      query: body => ({
        url: `/merchant/favorite-shop`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Favorites'],
    }),
    getFavoritesShops: build.query<
      { content: Ifavorites[] },
      { shopQuantity: string }
    >({
      query: body => ({
        url: `/merchant/favorite-shops`,
        params: body,
      }),
      providesTags: ['Favorites'],
    }),
    isFavorite: build.query<{ favorite: boolean }, { shopId: string }>({
      query: body => ({
        url: `/merchant/favorite-shop/${body.shopId}`,
      }),
    }),
    getVisitedShops: build.query<
      { content: Ifavorites[] },
      { shopQuantity: string }
    >({
      query: body => ({
        url: `/merchant/shops-visited`,
        params: body,
      }),
      providesTags: ['Favorites'],
    }),
    quitFavorite: build.mutation<{ message: string }, { shopId: string }>({
      query: body => ({
        url: `/merchant/favorite-shop/${body.shopId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Favorites'],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetFavoritesShopsQuery,
  useSetFavoriteMutation,
  useIsFavoriteQuery,
  useGetVisitedShopsQuery,
  useQuitFavoriteMutation,
} = extendedApiFavorites;
