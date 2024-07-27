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
import { useSendFriendRequestMutation} from '../redux/api/friendApi';
import { toast } from 'react-toastify';
import { go_profile_other_user } from '../redux/slices/profileSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Suggestion_amis({usernonfriend}) {
  // for redux and redux tolkit query 
        const [sendFriendRequest, { isSuccess: sendSuccess, isError: sendError }] = useSendFriendRequestMutation();
        const token = JSON.parse(localStorage.getItem('token'));
        const receiverId=usernonfriend._id
        const handleaddLikeClick=()=>{
          sendFriendRequest({token,receiverId})
        }
        const dispatch = useDispatch();
        const navigate = useNavigate()
  // pour afficher les toast 
        useEffect(() => {
          if (sendSuccess) {
            toast.success('readquest added successfully!');
          }
          if (sendError) {
            toast.error('an error in your request friends');
          }
        }, [sendSuccess,sendError]);

  return (
    <Card key={usernonfriend._id} style={{width:'100%',cursor:'pointer'}}
    >
    <CardMedia
      sx={{ height: 140 }}
      image={usernonfriend && usernonfriend?.profilePicture ? `${URL}/uploads/${usernonfriend?.profilePicture}`: null}
      title="green iguana"
      onClick={()=>{dispatch(go_profile_other_user({profile_owner:usernonfriend._id}))
      navigate('/profile')
    }} 
    />
    <CardContent>
    <Typography onClick={()=>{dispatch(go_profile_other_user({profile_owner:usernonfriend._id}))
      navigate('/profile')
    }}  variant="h6">{usernonfriend.username}</Typography>
    </CardContent> 
    <CardActions style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Button onClick={handleaddLikeClick} style={{ width: '80%' }} variant="outlined" startIcon={<PersonAddIcon />} >
        Add Friend
      </Button>
    </CardActions>
  </Card>
  )
}

export default Suggestion_amis