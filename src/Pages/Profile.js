import React from 'react';
import Coverture_pic from '../components/Coverture_pic';
import { Box, Button, CircularProgress, Divider, Paper, Typography, useMediaQuery } from '@mui/material';
import Post from '../components/Post';
import { useGetUserByIdQuery } from '../redux/api/postApi';
import {useSelector } from 'react-redux';
import { useSendFriendRequestMutation } from '../redux/api/friendApi';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { user } = useSelector((state) => state.user);
  const { profile_owner,current_user_owner } = useSelector((state) => state.profile);
  const user_id = current_user_owner? user?._id:profile_owner
  const [sendFriendRequest, { isSuccess: sendSuccess, isError: sendError }] = useSendFriendRequestMutation();
  const token = JSON.parse(localStorage.getItem('token'));
  const isMinWidth800 = useMediaQuery('(min-width:800px)');
  const navigate=useNavigate()

  const { data, error, isLoading } = useGetUserByIdQuery({token,user_id });

  if (isLoading) {
    return (
      <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CircularProgress />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant='h6'>Error: {error.message}</Typography>
      </Paper>
    );
  }

  if (!data || !data.user_info) {
    return (
      <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant='h6'>No user information available.</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Coverture_pic 
        coverPicture={data.user_info.coverPicture} 
        profilePicture={data.user_info.profilePicture} 
      />
      <Box sx={{ display: 'flex',alignItems:'center', justifyContent: 'center',gap:'20px', width: '40%', marginTop: '20px' }}>
        <Typography variant='h4'>{data.user_info.username}</Typography>
        { !current_user_owner && data.isfriend && <Button variant="outlined" >amis </Button>}
        { !current_user_owner && data.existingInvitation && <Button variant="outlined" >en attente </Button>}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '50px', width: '40%' }}>
      <Typography variant='h6' sx={{ marginLeft: '10px', marginTop: '10px' }}>
              il y a {data.nbpost} posts et {data.nbfriend} friend
      </Typography>
       
      </Box>
      <Divider sx={{ width: '100%', marginBottom: '20px' }} />
      <Box sx={{width:isMinWidth800?'50%':'100%'}}>
          {data.postsWithDetails && data.postsWithDetails.map((post) => (
              <Post key={post._id} post={post} />
          ))}
      </Box>
    
    </Paper>
  );
}

export default Profile;
