import { toFormData } from '@core/helpers/utils';
import {
  AvailableMerchantsTickets,
  FiltersNewTicketLoad,
  ITicket,
  ITicketDetail,
  NewTicketBody,
  NewTicketStep3Resp,
  NewTicktCreateResp,
  RespCreateMessage,
  Rimbroso,
  Ticket,
  TicketDetail,
  UnavailableShops,
} from '@core/interfaces';
import { ApiRedux } from '../api';

export const extendedApiTickets = ApiRedux.injectEndpoints({
  endpoints: build => ({
    newTicketComboStep1: build.query<Rimbroso[], void>({
      query: () => ({
        url: '/event/tickets/untracked_sales_type/list',
      }),
    }),
    newTicketComboStep2: build.query<
      { result: AvailableMerchantsTickets[] },
      void
    >({
      query: () => ({
        url: '/event/tickets/list_of_available_merchants/0',
      }),
    }),
    getUnlistedShops: build.query<{ merchantList: UnavailableShops[] }, void>({
      query: () => ({
        url: '/merchant/tickets/list_of_unavailable_merchants',
      }),
    }),
    newTicketLoadStep3: build.mutation<
      { status: string },
      FiltersNewTicketLoad
    >({
      query: body => ({
        url: `/event/tickets/${body.merchantId}/${body.orderDate}/${body.unsTypeId}`,
        method: 'POST',
      }),
    }),
    newTicketCrate: build.mutation<NewTicktCreateResp, NewTicketBody>({
      query: body => ({
        url: '/event/tickets',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Tickets'],
    }),
    reloadTickets: build.mutation<null, void>({
      queryFn: () => ({ data: null }),
      invalidatesTags: ['Tickets'],
    }),
    getAllTickets: build.query<{ ticketList: ITicket[] }, void>({
      query: () => ({
        url: '/management/user/tickets/list',
      }),
      providesTags: ['Tickets'],
    }),
    getTicket: build.query<ITicketDetail, { ticketId: string }>({
      query: body => ({
        url: `/management/user/tickets/${body.ticketId}`,
      }),
      providesTags: ['Tickets'],
    }),
    sendTicketMesssage: build.mutation<
      RespCreateMessage,
      { ticketId: string; message_body: string; file: any }
    >({
      query: body => ({
        url: `/management/user/tickets/${body.ticketId}`,
        method: 'POST',
        body: toFormData({
          message_body: body.message_body,
          file: body.file,
        }),
        invalidateTags: ['Tickets'],
      }),
    }),
    clearAllNotifications: build.mutation<
      { message: string },
      { ticketId: string }
    >({
      query: body => ({
        url: `/management/user/ticket/message/${body.ticketId}/viewed`,
        method: 'PUT',
      }),
      invalidatesTags: ['Tickets'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useClearAllNotificationsMutation,
  useGetUnlistedShopsQuery,
  useGetTicketQuery,
  useGetAllTicketsQuery,
  useSendTicketMesssageMutation,
  useNewTicketComboStep1Query,
  useNewTicketComboStep2Query,
  useNewTicketLoadStep3Mutation,
  useNewTicketCrateMutation,
  useReloadTicketsMutation,
} = extendedApiTickets;
