import React from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Box } from '@mui/material';
import Profile_pic from './Profile_pic';

function Coverture_pic() {
  return (
       <Box sx={{ position: 'relative', width: '70%', marginLeft: 'auto', marginRight: 'auto', marginTop: '18px' }}>
       <Card sx={{ height: 300 }}>
         <CardMedia
           sx={{ height: '100%' }}
           image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
           title="green iguana"
         />
       </Card>
       <Profile_pic />
     </Box>
  )
}

export default Coverture_pic