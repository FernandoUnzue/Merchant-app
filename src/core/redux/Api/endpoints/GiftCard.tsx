//merchants endpoints

import {
  FiltersMerchant,
  HomeGiftCardResp,
  HomeShopsResp,
  PaginatedResponseGiftList,
  PresentBody,
  RespGiftCardsList,
  RespMerchantList,
  SearchShop,
} from '@core/interfaces';
import { ApiRedux } from '../api';

export const extendedApiGiftCard = ApiRedux.injectEndpoints({
  endpoints: build => ({
    getMerchantsGiftCards: build.query<RespGiftCardsList, FiltersMerchant>({
      query: args => ({
        url: '/merchant/giftcard/list',
        params: args,
      }),
      providesTags: ['GiftCard'],
    }),
    reloadGiftCards: build.mutation<null, void>({
      queryFn: () => ({ data: null }),
      invalidatesTags: ['GiftCard'],
    }),
    searchShopGiftCard: build.query<
      Array<SearchShop>,
      { word: string; quantity: string }
    >({
      query: body => ({
        url: `/merchant/giftcard/search/${body.word}/${body.quantity}`,
      }),
    }),
    getHomeShopGiftCard: build.query<
      Array<HomeGiftCardResp>,
      { shopQuantity: string }
    >({
      query: body => ({
        url: '/merchant/giftcard/home/list',
        params: body,
      }),
    }),
    purchaseGiftCard: build.mutation<
      { orderId: string | null; orderNumber: number; status: string },
      { giftcardId: string; regali?: PresentBody }
    >({
      query: body => ({
        url: `/giftcard/cards/order/${body.giftcardId}`,
        method: 'POST',
        body: body.regali ? body.regali : undefined,
      }),
      invalidatesTags: ['GiftCard'],
    }),
    miGiftcardList: build.query<
      PaginatedResponseGiftList,
      { order: string; page: number; pageSize: number }
    >({
      query: body => ({
        url: '/giftcard/member/list',
        params: body,
      }),
      providesTags: ['GiftCard'],
    }),
    viewVoucherGiftCard: build.query<
      { voucherPdf: string | null; voucherPng: string },
      { cardId: string }
    >({
      query: args => ({
        url: `/giftcard/card/${args.cardId}/voucher/png`,
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  usePurchaseGiftCardMutation,
  useGetHomeShopGiftCardQuery,
  useGetMerchantsGiftCardsQuery,
  useReloadGiftCardsMutation,
  useSearchShopGiftCardQuery,
  useMiGiftcardListQuery,
  useViewVoucherGiftCardQuery,
} = extendedApiGiftCard;
