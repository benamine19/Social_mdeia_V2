// src/redux/slices/socketSlice.js
import { createSlice } from '@reduxjs/toolkit';
import io from 'socket.io-client';

const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    socket: null,
  },
  reducers: {
    connectSocket: (state, action) => {
      const newSocket = io('http://localhost:5000');
      newSocket.emit('addNewUser', action.payload);
      state.socket = newSocket;
    },
    disconnectSocket: (state) => {
      if (state.socket) {
        state.socket.disconnect();
        state.socket = null;
      }
    },
  },
});

export const { connectSocket, disconnectSocket } = socketSlice.actions;
export default socketSlice.reducer;
