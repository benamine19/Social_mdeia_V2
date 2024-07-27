import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Commentaires from './Commentaires';
import Create_Commenatire from './Create_Commenatire';
import { URL } from '../url';
import { useState } from 'react';
import {  useLikePostMutation,useDislikePostMutation } from '../redux/api/postApi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useMediaQuery } from '@mui/material';
import {Dialog, DialogTitle, DialogContent} from '@mui/material'
import { go_profile_other_user, go_profile_user_current } from '../redux/slices/profileSlice';
import { useNavigate } from 'react-router-dom';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard(props) {
// for redux 
        const [likePost, { isSuccess: likeSuccess, isError: likeError }] = useLikePostMutation();
        const [dislikePost, { isSuccess: dislikeSuccess, isError: dislikeError }] = useDislikePostMutation();
        const token = JSON.parse(localStorage.getItem('token'));
        const { user } = useSelector((state) => state.user);
        const user_id=user?._id
        const post_id=props.post._id
        const dispatch = useDispatch();
        const navigate = useNavigate()


// for MUI 
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    const isMinWidth800 = useMediaQuery('(min-width:800px)');
    const isBetween450and600 = useMediaQuery('(min-width:450px) and (max-width:600px)');
    const isBetween600and800 = useMediaQuery('(min-width:600px) and (max-width:800px)');
    const [open, setOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    const handleClickOpen = (image) => {
      setCurrentImage(image);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setCurrentImage(null);
    };

// for gestion of like and dislike
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    const data = { user_id, post_id };
    if (liked) {
      dislikePost({ token, data });
    } else {
      likePost({ token, data });
    }
    setLiked(!liked);
  };


// for reload 

    useEffect(() => {
      if (props.post.userCurrentDidLike !== undefined) {
        setLiked(props.post.userCurrentDidLike);
      }
    }, [props.userCurrentDidLike]);


    useEffect(() => {
      if (likeSuccess) {
        toast.success('Like added successfully!');
      }
    }, [likeSuccess]);

    useEffect(() => {
      if (dislikeSuccess) {
        toast.success('Like removed successfully!');
      }
    }, [dislikeSuccess]);

    useEffect(() => {
      if (likeError) {
        toast.error('like Error');
      }
    }, [likeError]);

    useEffect(() => {
      if (dislikeError) {
        toast.error('disLike error!');
      }
    }, [dislikeError]);
    


  return (
    <>
    <Card key={props.post._id} sx={{ width:isMinWidth800?'100%':isBetween600and800?'60%':isBetween450and600?'90%':'100%',marginLeft:'auto',marginRight:'auto'  }} style={{marginBottom:'30px'}}>
       <CardHeader
        style={{cursor:'pointer'}}
        avatar={
        <Avatar src={props && props.post &&  props.post.user && props.post.user ?.profilePicture ? `${URL}/uploads/${props.post.user.profilePicture}` : null } alt="Profile Picture" />
        }
        onClick={()=>{
          if (user_id === props.post.user.id) {
            dispatch(go_profile_user_current());
          } else {
            dispatch(go_profile_other_user({profile_owner:props.post.user.id}))
          }
          navigate('/profile')
        }}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.post.user.username}
        subheader= {new Date(props.post.createdAt).toLocaleString()}
       />
        <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.post.content}
        </Typography>
        </CardContent>
     {props.post.image?  <CardMedia
        component="img"
        height="194"
        src={`${URL}${props.post.image}`}
        alt="Paella dish"
        onClick={() => handleClickOpen(`${URL}${props.post.image}`)}
        style={{ 
          cursor: 'pointer', 
          objectFit: 'contain', // Cette ligne permet de s'assurer que l'image conserve son aspect ratio.
          maxHeight: '400px', // Ajustez cette valeur selon vos besoins
          maxWidth: '100%' // Pour s'assurer que l'image ne dépasse pas la largeur du conteneur
        }}

      />:null}
      <CardActions disableSpacing>
      <Box sx={{display:'flex',alignItems:'center'}}>      
          <IconButton sx={{ color: liked ? '#08a0ec' : 'default' }} onClick={handleLikeClick}>
              <ThumbUpIcon />
           </IconButton>
          <Typography variant="body2" color="text.secondary">
               {props.post.likesCount}
           </Typography>
      </Box>
      <Box sx={{display:'flex',alignItems:'center',marginLeft:'30px'}}>      
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <CommentIcon />
          </ExpandMore>
          <Typography variant="body2" color="text.secondary">
          {props.post.commentsCount}
           </Typography>
      </Box>
       
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
            <Create_Commenatire post={props.post}/>
            <Commentaires comments={props.post.comments}/>
        </CardContent>
      </Collapse>
    </Card>
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 1,
              top: 1,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box
            component="img"
            src={currentImage}
            alt=""
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain', // Cette ligne permet de s'assurer que l'image conserve son aspect ratio.
              maxHeight: '400px', // Ajustez cette valeur selon vos besoins
              maxWidth: '100%' // Pour s'assurer que l'image ne dépasse pas la largeur du conteneur
            }
            }
          />
        </DialogContent>
      </Dialog>
    </>

  );
}
