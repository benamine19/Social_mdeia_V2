import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import { postSlice } from './api/postApi';
import { friendSlice } from './api/friendApi';
import boite_disscussionSlice from './slices/boite_disscussionSlice';
import { messageSlice } from './api/messageApi';
import { notificationSlice } from './api/notificationApi';
import profileSlice from './slices/profileSlice';
import socketSlice from './slices/socketSlice';

const store = configureStore({
  reducer: {
    user:userSlice,
    boite_disscussion :boite_disscussionSlice,
    profile:profileSlice,
    socket: socketSlice,
    [postSlice.reducerPath]:postSlice.reducer,
    [friendSlice.reducerPath]:friendSlice.reducer,
    [messageSlice.reducerPath]:messageSlice.reducer,
    [notificationSlice.reducerPath]:notificationSlice.reducer,
    // [userapiSlice.reducerPath]:userapiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postSlice.middleware,friendSlice.middleware,messageSlice.middleware,notificationSlice.middleware),
});

export default store;