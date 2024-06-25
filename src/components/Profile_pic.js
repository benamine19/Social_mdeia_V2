import React from 'react';
import { Card, CardMedia } from '@mui/material';

function Profile_pic() {
  return (
    <Card sx={{ width: '22%', height: 200, position: 'absolute', bottom: '-25px', left: '25%', transform: 'translateX(-50%)', border: '5px solid white', overflow: 'hidden' }}>
      <CardMedia
        sx={{ height: '100%' }}
        image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
    </Card>
  );
}

export default Profile_pic;