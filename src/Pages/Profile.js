import React from 'react'
import Add_post from '../components/Add_post'
import Profile_pic from '../components/Profile_pic'
import Coverture_pic from '../components/Coverture_pic'
import { Box, Divider, Paper, Typography } from '@mui/material'
import { Margin } from '@mui/icons-material'
import Post from '../components/Post'
function Profile() {
  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Coverture_pic />
        <Box sx={{ display: 'flex', justifyContent: 'center',width:'40%', marginTop: '20px' }}>
          <Typography variant='h4' >Benali amine</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '50px',width:'40%' }}>
          <Typography variant='h6' sx={{ marginLeft: '10px', marginTop: '10px' }}>@aminebenali    33amis</Typography>
        </Box>
        <Divider sx={{ width: '100%', marginBottom: '20px' }} />
        <Add_post/>

        <Post/>
        <Post/>
        <Post/>


  </Paper>
)
}

export default Profile