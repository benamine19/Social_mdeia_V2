import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {URL} from '../../url'
export const postSlice = createApi({
  reducerPath: 'Tache',
  baseQuery: fetchBaseQuery({ baseUrl: URL+'/' }),
  tagTypes: ['Posts','postsProfile'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({token }) => ({
        url: `post/posts`,
        method: 'GET',
        headers: {
            token: token,
          },
      }),
      providesTags: ['Posts'],
    }),
    getUserById: builder.query({
      query: ({token,user_id }) => ({
        url: `/user/getUserById/${user_id}`,
        method: 'GET',
        headers: {
          token: token,
        },
      }),
      providesTags: ['postsProfile']
    }),
    updateUser: builder.mutation({
      query: ({token,user_id,data }) => ({
        url: `/user/updateUser/${user_id}`,
        method: 'PUT',
        headers: {
          token: token,
        },
        body:data ,
      }),
      invalidatesTags: ['Posts','postsProfile'],
    }),
    createPost: builder.mutation({
      query: ({ token, data }) => ({
        url: 'post/create_post',
        method: 'POST',
        headers: {
          token: token,
          },
        body:data,
      }),
        invalidatesTags: ['Posts'],
    }),
    deletePost: builder.mutation({
      query: ({ token, PostId }) => ({
        url: `post/delete_post/${PostId}`,
        method: 'DELETE',
        headers: {
          token: token,
          },
      }),
      invalidatesTags: ['Posts'],
    }),
    updatePost: builder.mutation({
      query: ({ token, PostId,data }) => ({
        url: `post/update_post/${PostId}`,
        method: 'PUT',
        headers: {
          token: token,
          },
          body:data ,
      }),
      invalidatesTags: ['Posts','postsProfile'],
    }),
    createComment: builder.mutation({
      query: ({ token, data }) => ({
        url: `comment/create_comment`,
        method: 'POST',
        headers: {
          token: token,
        },
        body: data,
      }),
      // Invalidate the specific post to trigger a refetch
      invalidatesTags: (result, error, { postId }) => [{ type: 'Posts', id: postId },{ type: 'postsProfile', id: postId }],
    }),
    likePost: builder.mutation({
      query: ({ token, data }) => ({
        url: `like/add_like`,
        method: 'POST',
        headers: {
          token: token,
        },
        body: data,
      }),
      // Invalidate the specific post to trigger a refetch
      invalidatesTags: (result, error, { postId }) => [{ type: 'Posts', id: postId },{ type: 'postsProfile', id: postId }],
    }),
    dislikePost: builder.mutation({
      query: ({ token, data }) => ({
        url: `like/remove_like`,
        method: 'DELETE',
        headers: {
          token: token,
        },
        body: data,
      }),
      // Invalidate the specific post to trigger a refetch
      invalidatesTags: (result, error, { postId }) => [{ type: 'Posts', id: postId },{ type: 'postsProfile', id: postId }],
    }),
  }),
});
export const {useUpdateUserMutation,useGetUserByIdQuery,useDislikePostMutation,useLikePostMutation, useCreatePostMutation,useDeletePostMutation,useUpdatePostMutation,useGetPostsQuery,useCreateCommentMutation} = postSlice;