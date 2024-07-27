import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useForm } from 'react-hook-form';
import { useCreateCommentMutation } from '../redux/api/postApi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
export default function Create_Commentaire(props) {
  const { register, handleSubmit,reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const user_id=user?._id
  const username=user?.username
  const profilePicture=user?.profilePicture
  const post=props.post._id
  const token = JSON.parse(localStorage.getItem('token'));
  const [createComment, { isSuccess,isError,isLoading }] = useCreateCommentMutation();
  const handleCommentSubmit = ({content}) => {
    const data={user_id,username,profilePicture,post,content}
    createComment({token,data})
  };
  useEffect(() => {
    if (isSuccess) {
      reset()
      toast.success('Task created successfully!');
    }
    if (isError) {
      toast.error('Failed to create task.');
    }
  }, [isSuccess, isError]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleCommentSubmit)}
      sx={{
        width: 500,
        maxWidth: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <TextField
        fullWidth
        label="Add a comment"
        id="content"
        {...register('content', { required: true })}
        error={!!errors.content}
        helperText={errors.content ? 'Comment is required' : ''}
      />
      <IconButton type="submit" color="primary">
        <SendIcon />
      </IconButton>
    </Box>
  );
}
