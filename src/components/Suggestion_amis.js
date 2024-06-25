import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import CardHeader from '@mui/material/CardHeader';
import { IconButton } from '@mui/material';
import { Margin } from '@mui/icons-material';

function Suggestion_amis() {
  return (
    <Card style={{width:'100%'}}>
    <CardMedia
      sx={{ height: 140 }}
      image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
      title="green iguana"
    />
    <CardContent>
    <Typography variant="h6">Benali amine</Typography>
    <Typography variant="span">30 amie en commun</Typography>


    </CardContent> 
    <CardActions style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Button style={{ width: '70%' }} variant="outlined" startIcon={<PersonAddIcon />}>
        Add Friend
      </Button>
      <Button style={{ width: '70%' ,marginTop:'2px',marginLeft:'0px' }} variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
    </CardActions>
  </Card>
  )
}

export default Suggestion_amis