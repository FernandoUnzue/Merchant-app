//movements endpoints

import { Filters, MovementsProps } from '@core/interfaces';
import { ApiRedux } from '../api';

export const extendedApiMovements = ApiRedux.injectEndpoints({
  endpoints: build => ({
    getMovements: build.query<MovementsProps[], Filters>({
      query: args => ({
        url: `/movement/list/`,
        params: args,
      }),
      providesTags: ['Movement'],
    }),
    reloadMovements: build.mutation<null, void>({
      queryFn: () => ({ data: null }),
      invalidatesTags: ['Movement'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetMovementsQuery, useReloadMovementsMutation } =
  extendedApiMovements;
