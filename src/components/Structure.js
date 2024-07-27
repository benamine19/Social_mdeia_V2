import React, { Fragment, useEffect, useState } from 'react'
import { Grid, Paper, Typography, Box } from '@mui/material';
import Left_side from './Left_side';
import Right_side from './Right_side';
import Section_principale from './Section_principale';
import Boite_disscussion from './Boite_disscussion';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

function Structure({socket}) {
  const {ouvert} = useSelector(state => state.boite_disscussion);
  
  return (
    <Fragment>
        <Box sx={{marginTop:'70px',display:'flex',justifyContent:'center'}}>
            {/* <Left_side/> */}
            <Section_principale />
            <Right_side socket={socket} />
        </Box>
        {ouvert &&<Boite_disscussion socket={socket} />}
    </Fragment>

  )
}

export default Structure