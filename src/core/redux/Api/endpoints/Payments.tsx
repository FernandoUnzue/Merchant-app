//payments endpoints

import {
  PaymentBody,
  PaymentRequestResponse,
  PaymentStatusRequestResponse,
} from '@core/interfaces';
import { ApiRedux } from '../api';

export const extendedApiPayments = ApiRedux.injectEndpoints({
  endpoints: build => ({
    getStatusPaymentStripe: build.query<
      PaymentStatusRequestResponse,
      { paymentId: number }
    >({
      query: args => ({
        url: `/api/member/payment/order/status/${args.paymentId.toString()}`,
      }),
    }),
    newPaymentStripe: build.mutation<PaymentRequestResponse, PaymentBody>({
      query: args => ({
        url: '/api/member/payment',
        method: 'POST',
        body: args,
      }),
      invalidatesTags: ['GiftCard'],
    }),
  }),

  overrideExisting: false,
});

export const { useGetStatusPaymentStripeQuery, useNewPaymentStripeMutation } =
  extendedApiPayments;
