import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {URL} from '../../url'


export const notificationSlice = createApi({
  reducerPath: 'notification',
  baseQuery: fetchBaseQuery({ baseUrl: URL+'/notification' }),
  tagTypes: ['notifications'],
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: ({token }) => ({
        url: `/getNotifications`,
        method: 'GET',
        headers: {
            token: token,
          },
      }),
      providesTags: ['notifications']
    }),
    markAllAsRead: builder.mutation({
        query: ({ token}) => ({
          url: '/markAllAsRead',
          method: 'POST',
          headers: {
            token: token,
            },
        }),
      invalidatesTags: ['notifications'],
      }),
     
  }),
});
export const {useGetNotificationsQuery,useMarkAllAsReadMutation} = notificationSlice;