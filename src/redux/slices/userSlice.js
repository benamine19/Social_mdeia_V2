import api from '../../config/requete'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';
import { toast } from 'react-toastify';

const initialState = {
    user: localStorage.getItem('token')?jwtDecode(JSON.stringify(localStorage.getItem('token'))):null,
    loading: false,
    loginError: null,
    registerError: null,
  };


export const LoginUser = createAsyncThunk('user/loginUser', async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('user/loginUser',{email, password});
      localStorage.setItem('token',JSON.stringify(response.data.data.token))
      toast.success('Login successful!');
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message); // Retourner seulement le message d'erreur
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
    });

export const RegisterUser = createAsyncThunk('user/registerUser', async ({username, email,profilePicture,coverPicture, password }, { rejectWithValue }) => {
        try {
          const response = await api.post('user/registerUser',{username, email,profilePicture,coverPicture, password });
          toast.success(response.data.message);
          return response.data;
        } catch (error) {
          if (error.response && error.response.data.message) {
            toast.error(error.response.data.message);
            return rejectWithValue(error.response.data.message); // Retourner seulement le message d'erreur
          } else {
            return rejectWithValue('An unexpected error occurred');
          }
        }
    });

    const userSlice = createSlice({
        name: 'user',
        initialState,
        reducers: {
          logout:(state)=>{
            state.user = null;
            localStorage.removeItem('token');
          }
        },
        extraReducers: (builder) => {
          builder
            .addCase(LoginUser.pending, (state,action) => {
              state.loading = true;
              state.loginError = null;
            })
            .addCase(LoginUser.fulfilled, (state, action) => {
              state.loading = false;
              state.user = action.payload.data;
            })
            .addCase(LoginUser.rejected, (state, action) => {
              state.loading = false;
              state.loginError = action.payload;
            })
            .addCase(RegisterUser.pending, (state) => {
              state.loading = true;
              state.registerError = null;
            })
            .addCase(RegisterUser.fulfilled, (state, action) => {
              state.loading = false;
              // state.user = action.payload;
            })
            .addCase(RegisterUser.rejected, (state, action) => {
              state.loading = false;
              state.registerError = action.payload;
            })
        },
      });
      
      
      export default userSlice.reducer;
      export const { logout } = userSlice.actions;