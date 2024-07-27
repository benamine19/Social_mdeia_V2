import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Typography from '@mui/material/Typography';
import { URL } from '../url';
import { go_profile_other_user } from '../redux/slices/profileSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function InvitationsForSender({send}) {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  return (
    <Card key={send._id}  onClick={()=>{dispatch(go_profile_other_user({profile_owner:send.recipient._id}))
      navigate('/profile')
    }} 
    style={{width:'100%',cursor:'pointer'}}>
    <CardMedia
      sx={{ height: 140 }}
      image={`${URL}/uploads/${send.recipient.profilePicture}`}
      title="green iguana"
     
    />
    <CardContent>
    <Typography variant="h6">{send.recipient.username}</Typography>
    </CardContent> 
    <CardActions style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Button style={{ width: '80%' }} variant="outlined" startIcon={<PersonAddIcon />} >
        en attente
      </Button>
      {/* <Button onClick={handledeleteClick} style={{ width: '70%' ,marginTop:'2px',marginLeft:'0px' ,backgroundColor:'red',color:'white' }} variant="outlined" startIcon={<DeleteIcon />}>
        annuler
      </Button> */}
    </CardActions>
  </Card>
  )
}

export default InvitationsForSender