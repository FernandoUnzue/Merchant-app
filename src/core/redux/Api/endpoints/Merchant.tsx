//merchant endpoints

import { BodyPostSale } from '@core/interfaces';
import { ApiRedux } from '../api';

export const extendedApiMerchant = ApiRedux.injectEndpoints({
  endpoints: build => ({
    postSale: build.mutation<{ message: string }, BodyPostSale>({
      query: body => ({
        url: `/merchant/webpos/sale`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),

  overrideExisting: false,
});

export const { usePostSaleMutation } = extendedApiMerchant;
