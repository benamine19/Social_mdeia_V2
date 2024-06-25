import React from 'react'
import { Box, Grid, Paper, Typography } from '@mui/material';
import Post from './Post';
function Section_principale() {
  return (
  <Grid item xs={12} md={6}>
        <Paper sx={{ padding: 2,  }}>
           <Post/>
           <Post/>
           <Post/>
           <Post/>
           <Post/>

        </Paper>
  </Grid>
  )
}

export default Section_principale