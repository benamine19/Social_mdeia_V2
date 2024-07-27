import React, { useEffect, useState } from 'react';
import { Box, Divider, IconButton, TextField, Card, Avatar, styled, Button, useMediaQuery, Typography } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { useDispatch, useSelector } from 'react-redux';
import { URL } from '../url';
import { useForm } from 'react-hook-form';
import { useCreatePostMutation } from '../redux/api/postApi';
import { toast } from 'react-toastify';
import FormData from 'form-data'
// Pour Material UI
const CustomTextField = styled(TextField)({
  '& .MuiFilledInput-root': {
    borderRadius: 25,
    backgroundColor: '#D6E5F7',
    '&:before': {
      borderBottom: '1px solid rgba(0, 0, 0, 0.8)',
      left: '18px',
      right: '18px',
    },
    '&:after': {
      borderBottom: '3px solid #1E88E5',
      left: '14px',
      right: '14px',
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottom: '1px solid rgba(0, 0, 0, 0.87)',
    },
  },
  '& .MuiFilledInput-input': {
    padding: '2px 10px',
  },
});

function Add_post() {
  // Initialisation de redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const user_id=user?._id
  const username=user?.username
  const profilePicture=user?.profilePicture
  const isMinWidth800 = useMediaQuery('(min-width:800px)');
  const isBetween450and600 = useMediaQuery('(min-width:450px) and (max-width:600px)');
  const isBetween600and800 = useMediaQuery('(min-width:600px) and (max-width:800px)');


  const token = JSON.parse(localStorage.getItem('token'));
  const [createPost, { isSuccess,isError,isLoading }] = useCreatePostMutation();

  // Initialisation de React Hook Form
  const { register, handleSubmit, watch,reset, control, formState: { errors } } = useForm({
    mode: 'onSubmit',
  });

  const [image, setImage] = useState(null);

  const onSubmit = async ({ content }) => {
    // Ensure user data is available before appending
    if (!user_id || !username || !profilePicture) {
      console.error('User data not available, waiting...');
      return; // Prevent form submission if data isn't ready
    }

    let formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('username', username);
    formData.append('content', content);
    formData.append('profilePicture', profilePicture);
    if (image) {
      formData.append('image', image);
    }
    createPost({ token, data: formData });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Regarder le contenu du champ pour changer la couleur du bouton
  const content = watch('content');

  useEffect(() => {
    if (isSuccess) {
      reset()
      toast.success('Task created successfully!');
      setImage(null)
    }
    if (isError) {
      toast.error('Failed to create task.');
    }
  }, [isSuccess, isError]);

  return (
    <Card component="form" onSubmit={handleSubmit(onSubmit)} sx={{border:'1px solid #0b4e91', backgroundColor: 'white',display:'flex',flexDirection:'column',width:isMinWidth800?'80%':isBetween600and800?'60%':isBetween450and600?'80%':'100%',marginTop:'50px',marginBottom:'50px',marginLeft:'auto',marginRight:'auto',gap:'20px'}}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start',width:'100%'}}>
          <Avatar
                sx={{ width: '10%', height: 'auto', marginRight: '4px' }}
                src={user && user.profilePicture ? `${URL}/uploads/${user.profilePicture}` : null}
                alt="Profile Picture"
          />   
           <Typography component="h1" variant="h6" sx={{margin:'8px',fontFamily:'Zen Kaku Gothic Antique',fontWeight:'25px',color:'#2856B4'}}>
               {user && user.username}
          </Typography>    
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',width:'100%',gap:'25px'}}>
            <Box sx={{width:'8%'}}>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="icon-button-file"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="icon-button-file">
                    <IconButton sx={{ color: '#1E88E5' }} component="span">
                      <AddPhotoAlternateIcon sx={{ fontSize: 35 }} />
                    </IconButton>
                  </label>
            </Box>
            <Box sx={{  width: '85%', }} noValidate autoComplete="off">
                  <CustomTextField
                    {...register('content')}
                    id="filled-multiline-flexible"
                    label="Que voulez-vous partager ?"
                    multiline
                    maxRows={4}
                    variant="filled"
                    sx={{width:'85%'}}
                    error={!!errors.content}
                    helperText={errors.content ? errors.content.message : ''}
                  />
            </Box>
      </Box>
      <Divider />
      <Button
        type="submit"
        sx={{
          width: '100%',
          marginTop: '2px',
          marginBottom: '2px',
          backgroundColor: (content || image) ? '#0b4e91' : '#B1C0DD',
          color: (content || image) ? 'white' : 'black',
          '&:hover': {
            backgroundColor: (content || image) ? '#0b4e91' : '#B1C0DD',
          },
        }}
        disabled={!(content || image)}
      >
        publier
      </Button>
    </Card>
  );
}

export default Add_post;
