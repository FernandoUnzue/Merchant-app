import { INotification } from "@core/interfaces";
import { ApiRedux } from "../api";

//notifications endpoints
export const extendedApiNotifications = ApiRedux.injectEndpoints({
    endpoints:(build)=>({
        getNotifications: build.query<INotification[],void>({
            query:()=>({
              url:'/api/notifications'
            }),
            providesTags: ['Notifications']
          }),
          setNotificationViewed: build.mutation<INotification,{notificationId: number, viewed: boolean}>({
            query:(body)=>({
              url:'/api/notification',
              method: 'PUT',
              body
            }),
            invalidatesTags: ['Notifications']
          }),
          getNotification: build.query<INotification,{notificationId: number}>({
            query:(body)=>({
              url:`/api/notification/${body.notificationId}`
            }),
            providesTags: ['Notifications']
          }),
          deleteNotification: build.mutation<INotification,{notificationId: number}>({
            query:(body)=>({
              url:`/api/notification`,
              method: 'DELETE',
              body
            }),
            invalidatesTags: ['Notifications']
          }),
          markAllViewed: build.mutation<INotification[],void>({
            query:()=>({
              url: '/api/notification/readed',
              method: 'PUT'
            }),
            invalidatesTags: ['Notifications']
          }),
          getCountNoti: build.query<{notificationCount: number},void>({
            query:()=>({
              url:'/api/notification/count'
            }),
            providesTags: ['Notifications']
          })
    }),
    overrideExisting: false,
})

export const { useMarkAllViewedMutation,
    useGetNotificationsQuery,
    useDeleteNotificationMutation,
    useGetCountNotiQuery,
    useGetNotificationQuery,
    useSetNotificationViewedMutation,} = extendedApiNotifications;