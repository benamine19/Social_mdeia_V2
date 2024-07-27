import React from 'react';
import { Box, Grid, Paper, Typography, CircularProgress, useMediaQuery } from '@mui/material';
import Post from './Post';
import { useDispatch, useSelector } from 'react-redux';
import { useGetPostsQuery } from '../redux/api/postApi';
import Add_post from './Add_post';

function Section_principale() {
  const { user } = useSelector((state) => state.user);
  const token = JSON.parse(localStorage.getItem('token'));
  const userId = user?._id;
  const isMinWidth800 = useMediaQuery('(min-width:800px)');
  const { data, error, isLoading } = useGetPostsQuery({ token });
  console.log('data de possts',data)
  if (isLoading) {
    return (
      <Box  sx={{ width:isMinWidth800?'45%':'90%',marginLeft:'auto',marginRight:'auto'}}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box  sx={{ width:isMinWidth800?'45%':'90%',marginLeft:'auto',marginRight:'auto'}}>
      <Add_post/>
      <Paper sx={{ padding: 2 }}>
        {/* Example rendering posts */}
        {data && data.map(post => (
          <Post post={post} />
        ))}
      </Paper>
    </Box>
  );
}

export default Section_principale;
