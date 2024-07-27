import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {URL} from '../../url'


export const messageSlice = createApi({
  reducerPath: 'message',
  baseQuery: fetchBaseQuery({ baseUrl: URL+'/message' }),
  tagTypes: ['messages'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: ({token ,receiverId}) => ({
        url: `/getMessages/${receiverId}`,
        method: 'GET',
        headers: {
            token: token,
          },
      }),
      providesTags: ['messages']
    }),
    sendMessage: builder.mutation({
        query: ({ token,receiverId, content }) => ({
          url: '/send',
          method: 'POST',
          headers: {
            token: token,
            },
            body:{receiverId,content} 
        }),
      invalidatesTags: ['messages'],
      }),
     
  }),
});
export const {useGetMessagesQuery,useSendMessageMutation} = messageSlice;