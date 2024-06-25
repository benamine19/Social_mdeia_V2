import React from 'react'
import { Grid, Paper, Typography, Box } from '@mui/material';
import Left_side from './Left_side';
import Right_side from './Right_side';
import Section_principale from './Section_principale';
function Structure() {
  return (
    <Grid container spacing={2} style={{marginTop:'70px'}}>
        <Left_side/>
        <Section_principale/>
        <Right_side/>
    </Grid>    
  )
}

export default Structure