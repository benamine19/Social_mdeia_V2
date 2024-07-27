import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Typography from '@mui/material/Typography';
import { URL } from '../url';
import { useAcceptFriendRequestMutation,useRejectFriendRequestMutation} from '../redux/api/friendApi';
import { toast } from 'react-toastify';
import { go_profile_other_user } from '../redux/slices/profileSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Invitationslijawk({recive}) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [acceptFriendRequest, { isSuccess: acceptSuccess, isError: acceptError }] = useAcceptFriendRequestMutation();
  const [rejectFriendRequest, { isSuccess: RejectSuccess, isError: RejectError }] = useRejectFriendRequestMutation();

  const token = JSON.parse(localStorage.getItem('token'));
  const invitationId=recive._id

  const handleaacceptClick=()=>{
    acceptFriendRequest({token,invitationId})
  }
  const handlerejectedClick=()=>{
    console.log('token,invitationId ::::: ', token,invitationId)
    rejectFriendRequest({token,invitationId})
  }

   // pour afficher les toast 
        useEffect(() => {
          if (acceptSuccess) {
            toast.success('acceptSuccess');
          }
          if (acceptError) {
            toast.error('acceptError');
          }
        }, [acceptSuccess,acceptError]);


        useEffect(() => {
          if (RejectSuccess) {
            toast.success('RejectSuccess');
          }
          if (RejectError) {
            toast.error('RejectError');
          }
        }, [RejectSuccess,RejectError]);

  return (
    <Card key={recive?._id} style={{width:'100%'}} >
    <CardMedia
      sx={{ height: 140 }}
      image={recive && recive.sender && recive.sender.profilePicture ? `${URL}/uploads/${recive.sender.profilePicture}` : null}
      title="green iguana"
    />
    <CardContent>
    <Typography
      style={{cursor:'pointer'}}
    variant="h6"     onClick={()=>{dispatch(go_profile_other_user({profile_owner:recive.sender._id}))
    navigate('/profile')
  }} >{recive && recive.sender && recive.sender?.username}</Typography>
    </CardContent> 
    <CardActions style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <Button onClick={handleaacceptClick} style={{ width: '70%' }} variant="outlined" startIcon={<PersonAddIcon />} >
    accept
  </Button>
  <Button onClick={handlerejectedClick} style={{ width: '70%', marginTop:'2px', marginLeft:'0px', backgroundColor:'red', color:'#cf5123' }} variant="outlined" startIcon={<DeleteIcon />}>
    {recive.sender && recive.sender.username ? (
      <Typography sx={{ color:'white' }}>{recive.sender.username}</Typography>
    ) : (
      <Typography sx={{ color:'white' }}>Unknown User</Typography>
    )}
  </Button>
</CardActions>
  </Card>
  )
}

export default Invitationslijawk