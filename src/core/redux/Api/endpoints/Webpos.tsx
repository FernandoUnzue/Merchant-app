//user endpoints

import { toFormData } from '@core/helpers/utils';
import {
  BodyPostSale,
  CategoryProp,
  GetOpInfoResponse,
  PonderazioneBody,
  ProfileResponse,
  Provinces,
  ReplaceCardBody,
  ReplaceCardResponse,
  ResponseListVouchers,
  ResponsePostSale,
} from '@core/interfaces';
import { ApiRedux } from '../api';

export const extendedApiWebpos = ApiRedux.injectEndpoints({
  endpoints: build => ({
    postSale: build.mutation<ResponsePostSale, BodyPostSale>({
      query: body => ({
        url: `/merchant/webpos/saleByCard`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User', 'Sales'],
    }),
    getLastMovement: build.query<ResponsePostSale, { customerId: string }>({
      query: args => ({
        url: `/merchant/webpos/getLastTransaction/${args.customerId}`,
      }),
      providesTags: ['Sales'],
    }),
    cancelLastMovement: build.mutation<
      void,
      { customerId: string; notes: string }
    >({
      query: body => ({
        url: `/merchant/webpos/cancelLastTransaction`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Sales', 'User'],
    }),
    getVochers: build.query<ResponseListVouchers, { customerId: string }>({
      query: args => ({
        url: `/merchant/webpos/getVouchers/${args.customerId}`,
      }),
      providesTags: ['Sales'],
    }),
    setPonderation: build.mutation<void, PonderazioneBody>({
      query: body => ({
        url: `/merchant/webpos/setWeighing`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Sales', 'User', 'Ponderation'],
    }),
    getPonderation: build.query<
      {
        answerCode: number;
        category: {
          weightChargePointPoints: number;
          weightChargePointMoney: number;
        };
      },
      { operatorId: number }
    >({
      query: args => ({
        url: `/merchant/webpos/getWeighing/${args.operatorId}`,
      }),
      providesTags: ['Ponderation'],
    }),
    getOperatorInfo: build.query<GetOpInfoResponse, { username: string }>({
      query: args => ({
        url: `/merchant/webpos/getOperatorInfo/${args.username}`,
      }),
      providesTags: ['Operator'],
    }),
    reloadSales: build.mutation<null, void>({
      queryFn: () => ({ data: null }),
      invalidatesTags: ['User', 'Sales', 'Operator', 'Ponderation'],
    }),
    replaceCard: build.mutation<ReplaceCardResponse, ReplaceCardBody>({
      query: body => ({
        url: `/merchant/webpos/replaceCard`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Sales', 'User', 'Ponderation', 'Operator'],
    }),
  }),

  overrideExisting: false,
});

export const {
  useReplaceCardMutation,
  useReloadSalesMutation,
  usePostSaleMutation,
  useGetLastMovementQuery,
  useGetOperatorInfoQuery,
  useGetPonderationQuery,
  useGetVochersQuery,
  useCancelLastMovementMutation,
  useSetPonderationMutation,
} = extendedApiWebpos;
