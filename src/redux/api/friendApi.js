import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {URL} from '../../url'


export const friendSlice = createApi({
  reducerPath: 'Friend',
  baseQuery: fetchBaseQuery({ baseUrl: URL+'/friend' }),
  tagTypes: ['Nonfriends','friends','invitationsRecu','invitationsenvoyer'],
  endpoints: (builder) => ({
    getNonFriends: builder.query({
      query: ({token }) => ({
        url: `/getNonFriends`,
        method: 'GET',
        headers: {
            token: token,
          },
      }),
      providesTags: ['Nonfriends']
    }),
    getInvitations: builder.query({
      query: ({token }) => ({
        url: `/getInvitations`,
        method: 'GET',
        headers: {
            token: token,
          },
      }),
      providesTags: ['invitationsRecu']
    }),
    getInvitationsforsender: builder.query({
      query: ({token }) => ({
        url: `/getInvitationsforsender`,
        method: 'GET',
        headers: {
            token: token,
          },
      }),
      providesTags:['invitationsenvoyer']
    }),
    getFriends: builder.query({
      query: ({ token,searchTerm}) => ({
        url: `/getFriends${searchTerm ? `?search=${searchTerm}` : ''}`,
        method: 'GET',
        headers: {
          token: token,
          },
      }),
      providesTags: ['friends']
    }),
    searchUser: builder.query({
      query: ({ token,searchTerm}) => ({
        url: `/searchUser${searchTerm ? `?search=${searchTerm}` : ''}`,
        method: 'GET',
        headers: {
          token: token,
          },
      }),
    }),
    sendFriendRequest: builder.mutation({
        query: ({ token,receiverId}) => ({
          url: '/sendFriendRequest',
          method: 'POST',
          headers: {
            token: token,
            },
            body:{receiverId} ,
        }),
      invalidatesTags: ['Nonfriends','invitationsenvoyer'],
      }),
      acceptFriendRequest: builder.mutation({
        query: ({ token,invitationId}) => ({
          url: '/acceptFriendRequest',
          method: 'POST',
          headers: {
            token: token,
            },
            body:{invitationId} ,
        }),
      invalidatesTags: ['friends','invitationsRecu'],
      }),
      rejectFriendRequest: builder.mutation({
        query: ({ token,invitationId}) => ({
          url: '/rejectFriendRequest',
          method: 'POST',
          headers: {
            token: token,
            },
            body:{invitationId} ,
        }),
      invalidatesTags: ['Nonfriends','invitationsRecu'],
      }),
  }),
});
export const {useSearchUserQuery,useGetFriendsQuery,useGetNonFriendsQuery,useSendFriendRequestMutation,useGetInvitationsforsenderQuery,useGetInvitationsQuery,useAcceptFriendRequestMutation,useRejectFriendRequestMutation} = friendSlice;