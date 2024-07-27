import { createSlice} from '@reduxjs/toolkit';

const profileSlice = createSlice({
 name:'profileSlice',
 initialState: {
    profile_owner :null,
    current_user_owner:false,
  },
 reducers :{
  go_profile_other_user:(state,action) =>{
    state.current_user_owner = false
    state.profile_owner = action.payload.profile_owner;
  },
  go_profile_user_current:(state) =>{
    state.profile_owner = null
    state.current_user_owner = true
  },
 }
});

export default profileSlice.reducer;

export const { go_profile_other_user ,go_profile_user_current } = profileSlice.actions;