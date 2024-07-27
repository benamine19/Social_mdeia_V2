import * as React from 'react';
import { Box, CircularProgress, Grid, Paper, Typography, useMediaQuery } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Suggestion_amis from './Suggestion_amis';
import Invitationslijawk from './Invitationslijawk';
import { useSelector } from 'react-redux';
import {useGetNonFriendsQuery,useGetInvitationsforsenderQuery,useGetInvitationsQuery } from '../redux/api/friendApi';
import InvitationsForSender from './InvitationsForSender';
export default function Left_side() {
        // media query 
        const isMinWidth800 = useMediaQuery('(min-width:800px)');
        const { user } = useSelector((state) => state.user);
        const token = JSON.parse(localStorage.getItem('token')); 
        const userId = user?._id; 
        const { data: nonFriendsData, error: nonFriendsError, isLoading: nonFriendsLoading } = useGetNonFriendsQuery({ token });
        const { data: invitationsForSenderData, error: invitationsForSenderError, isLoading: invitationsForSenderLoading } = useGetInvitationsforsenderQuery({ token });
        const { data: invitationsData, error: invitationsError, isLoading: invitationsLoading } = useGetInvitationsQuery({ token });
    
if (nonFriendsLoading) {
                return (
                <Box  sx={{ display:isMinWidth800 ?'block':'none',width:'25%'}}>
                    <CircularProgress />
                </Box>
                );
}

  return (
      <Box  sx={{ display:isMinWidth800 ?'block':'none',width:'25%'}}>
       <Paper sx={{ padding: 2,  }}>
           <Box sx={{background:'#0290f6',textAlign:'center',borderRadius:'20px',width:'100%',margin:'auto'}}>
              <Typography variant="h6" sx={{color:'white'}}>
                         you are recive this friend request 
              </Typography>
           </Box>
           <List sx={{border:'2px solid black' ,display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%', overflowX: 'auto'}}>
           {invitationsData && invitationsData.map(recive => (
                        <React.Fragment>
                                <ListItem>
                                <Invitationslijawk recive={recive}/>
                                </ListItem>
                                <Divider />
                        </React.Fragment>
                ))}    
           </List>
        </Paper>
        <Paper sx={{ padding: 2,  }}>
        <Box sx={{background:'#0290f6',textAlign:'center',borderRadius:'20px',width:'150px',margin:'auto',width:'100%'}}>
              <Typography variant="body2" sx={{color:'white'}}>
                         you are send this friend requesta
                </Typography>
        </Box>
           <List sx={{border:'2px solid black' ,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                {invitationsForSenderData && invitationsForSenderData.map(send => (
                        <React.Fragment>
                                <ListItem>
                                <InvitationsForSender send={send}/>
                                </ListItem>
                                <Divider />
                        </React.Fragment>
                ))} 
           </List>
        </Paper>

        <Paper sx={{ padding: 2,  }}>
        <Box sx={{background:'#0290f6',textAlign:'center',borderRadius:'20px',width:'150px',margin:'auto',width:'100%'}}>
              <Typography variant="body2" sx={{color:'white'}}>
                       may be you know this users
                </Typography>
        </Box>
        <List sx={{border:'2px solid black' ,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                {nonFriendsData && nonFriendsData.map(usernonfriend => (
                        <React.Fragment>
                                <ListItem>
                                <Suggestion_amis usernonfriend={usernonfriend}/>
                                </ListItem>
                                <Divider />
                        </React.Fragment>
                ))}    
           </List>
        </Paper>
      </Box>
  );
}