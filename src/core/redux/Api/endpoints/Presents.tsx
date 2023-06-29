//merchants endpoints

import {
  FiltersPresents,
  PresentBody,
  PresentsResponse,
  RespPaginated,
} from '@core/interfaces';
import { ApiRedux } from '../api';

export const extendedApiPresents = ApiRedux.injectEndpoints({
  endpoints: build => ({
    getPresents: build.query<RespPaginated<PresentsResponse>, FiltersPresents>({
      query: args => ({
        url: '/member/present/list',
        params: args,
      }),
      providesTags: ['Presents'],
    }),
    reloadPresents: build.mutation<null, void>({
      queryFn: () => ({ data: null }),
      invalidatesTags: ['Presents'],
    }),
    newPresent: build.mutation<void, PresentBody>({
      query: args => ({
        url: '/member/present/new',
        method: 'POST',
        body: args,
      }),
      invalidatesTags: ['Presents'],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetPresentsQuery,
  useReloadPresentsMutation,
  useNewPresentMutation,
} = extendedApiPresents;
