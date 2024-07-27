import { createSlice} from '@reduxjs/toolkit';

const boite_disscussionSlice = createSlice({
 name:'boite_disscussionSlice',
 initialState: {
    ouvert :false,
    receiverId:null,
    username:null,
    profilePicture:null,
  },
 reducers :{
  click_sur_ami:(state,action) =>{
    state.ouvert = true
    state.receiverId = action.payload.receiverId;
    state.username = action.payload.username;
    state.profilePicture = action.payload.profilePicture;
  },
  fermer_disscusion:(state,action) =>{
    state.ouvert = false
  },
 }
});

export default boite_disscussionSlice.reducer;

export const { click_sur_ami ,fermer_disscusion } = boite_disscussionSlice.actions;