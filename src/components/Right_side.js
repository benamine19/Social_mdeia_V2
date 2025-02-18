import React, { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Container, Grid, Paper, Typography, useMediaQuery } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Input_search from './Input_search';
import GroupIcon from '@mui/icons-material/Group';
import { useGetFriendsQuery } from '../redux/api/friendApi';
import { useDispatch, useSelector } from 'react-redux';
import { URL } from '../url';
import { click_sur_ami } from '../redux/slices/boite_disscussionSlice';
import io from 'socket.io-client';

function Right_side({socket}) {

// media query 
const isMinWidth800 = useMediaQuery('(min-width:800px)');

  // for search 
  const [searchTerm, setSearchTerm] = useState('');

  // for redux 
  const dispatch=useDispatch()
  const { user } = useSelector((state) => state.user);
  const token = JSON.parse(localStorage.getItem('token')); 
  const userId=user?._id
  const { data, error, isLoading} = useGetFriendsQuery({ token ,searchTerm });
  const handlecklick_ami=(receiverId,username,profilePicture)=>{
    dispatch(click_sur_ami({ receiverId,username,profilePicture}));
  }
  // for socket.io 
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on('getonlineUsers', (res) => {
        setOnlineUsers(res);
      });

      return () => {
        socket.off('getonlineUsers');
      };
    }
  }, [socket]);


 if (isLoading) {
 
    return (
    <Box  sx={{ display:isMinWidth800 ?'block':'none',width:'25%'}}>
      <Paper sx={{ padding: 2, height: '100vh' }}>
            <Grid container spacing={0} alignItems="center">
              <Grid item xs={2}>
                <GroupIcon />
              </Grid>
              <Grid item xs={10}>
              <Input_search setSearchTerm={setSearchTerm} />
              </Grid>
            </Grid>
                    <Divider/>
             <Box sx={{display:'flex' ,justifyContent:'center',alignItems:'center',marginTop:'80px'}} >
              <CircularProgress />
             </Box>
             
      </Paper>
</Box>
    );
}
  return (
    <Box  sx={{ display:isMinWidth800 ?'block':'none',width:'25%'}}>
        <Paper sx={{ padding: 2, height: '100vh' }}>
              <Grid container spacing={0} alignItems="center">
                <Grid item xs={2}>
                  <GroupIcon />
                </Grid>
                <Grid item xs={10}>
                  <Input_search setSearchTerm={setSearchTerm} />
                </Grid>
              </Grid>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <Divider/>
          {data && data.map(friend => {
            const isOnline = onlineUsers.some(user => user.userId === friend._id);
            return (
              <React.Fragment key={friend._id}>
                <Button sx={{ width: '100%' }} onClick={() => handlecklick_ami(friend._id, friend.username, friend.profilePicture)}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt={friend?.username} src={friend && friend?.profilePicture ? `${URL}/uploads/${friend.profilePicture}` : null } />
                    </ListItemAvatar>
                    <ListItemText
                      primary={friend.username}
                      secondary={isOnline ? "en ligne" : "hors ligne"}
                      secondaryTypographyProps={{ color: isOnline ? 'green' : 'textSecondary' }}
                    />
                  </ListItem>
                </Button>
                <Divider variant="middle" component="li" />
              </React.Fragment>
            );
          })}
          <Divider variant="middle" component="li" />
        </List>
        </Paper>
  </Box>
  )
}

export default Right_side