import React, { useEffect, useRef, useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Divider, Box, List, CircularProgress, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ImageIcon from '@mui/icons-material/Image';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { fermer_disscusion } from '../redux/slices/boite_disscussionSlice';
import { URL } from '../url';
import { useForm } from 'react-hook-form';
import { useGetMessagesQuery, useSendMessageMutation } from '../redux/api/messageApi';
import { toast } from 'react-toastify';
import Messsage_moi from './Messsage_moi';
import Message_lui from './Message_lui';
import { go_profile_other_user } from '../redux/slices/profileSlice';
import { useNavigate } from 'react-router-dom';




function Boite_disscussion({ socket }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { receiverId, username, profilePicture } = useSelector((state) => state.boite_disscussion);
  const { user } = useSelector((state) => state.user);
  const token = JSON.parse(localStorage.getItem('token'));
  const handleclose = () => {
    dispatch(fermer_disscusion());
  };

  const [sendMessage, { isSuccess: isSuccesssendMessage, isError: isErrorsendMessage, isLoading: isLoadingsendMessage }] = useSendMessageMutation();
  const { data: GetMessagesdata, error: GetMessagesError, isLoading: GetMessagesLoading } = useGetMessagesQuery({ token, receiverId });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    mode: 'onSubmit',
  });

  const onSubmit = async ({ content }) => {
    sendMessage({ token, receiverId, content });
    const Message = {
      sender: user._id,
      reciver: receiverId,
      content,
    };
    if (socket) {
      socket.emit('addMessage', Message);
    }
  };

  const contentRef = useRef(null);
  const endOfMessagesRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleScrollToBottom = () => {
        if (endOfMessagesRef.current) {
          endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
        }
  };

  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setShowScrollButton(false);
      } else {
        setShowScrollButton(true);
      }
    }
  };

  useEffect(() => {
    if (isSuccesssendMessage) {
      reset();
      toast.success('Message sent successfully!');
      handleScrollToBottom();
    }
    if (isErrorsendMessage) {
      toast.error('Failed to send message.');
    }
  }, [isSuccesssendMessage, isErrorsendMessage]);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on('getMessage', (res) => {
        setMessages((prevMessages) => [...prevMessages, res]);
        handleScrollToBottom();
      });

      return () => {
        socket.off('getMessage');
      };
    }
  }, [socket]);

  useEffect(() => {
    if (GetMessagesdata) {
      setMessages(GetMessagesdata);
      handleScrollToBottom();
    }
  }, [GetMessagesdata]);
   
  useEffect(() => {
    handleScrollToBottom();
  }, [messages]);


  return (
    <Card sx={{ maxWidth: 345, position: 'fixed', bottom: '0px', right: '25%', zIndex: '99' }}>
      <CardHeader
        sx={{ height: '40px' }}
        avatar={
          <Avatar         style={{cursor:'pointer'}}
          onClick={()=>{dispatch(go_profile_other_user({profile_owner:receiverId}))
          navigate('/profile')
        }}  src={`${URL}/uploads/${profilePicture}`} alt="Profile Picture" />
        }
        action={
          <Box sx={{ display: 'flex', flexDirection: 'row', p: 1, m: 1, borderRadius: 1 }}>
            <IconButton onClick={handleclose} sx={{ color: '#1E88E5' }}>
              <CloseIcon />
            </IconButton>
          </Box>
        }
        title={username} 
      />
      <Divider />
      <CardContent ref={contentRef} onScroll={handleScroll} sx={{ padding: '0px', height: '300px', overflowY: 'auto' }}>
        {showScrollButton && (
          <IconButton sx={{ color: '#1E88E5', position: 'absolute', zIndex: 99, right: 3, top: 190, backgroundColor: '#A2D2F4' }} onClick={handleScrollToBottom}>
            <ArrowDownwardIcon sx={{ color: '#1E88E5' }} />
          </IconButton>
        )}
        <List>
          {GetMessagesLoading ? (
            <Box sx={{ marginTop: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress />
            </Box>
          ) : (
            messages.map((message) => (
              message.sender === user._id ? (
                <Messsage_moi key={message._id} message={message} />
              ) : (
                <Message_lui key={message._id} message={message} profilePicture={profilePicture} />
              )
            ))
          )}
        <div ref={endOfMessagesRef}></div>
        </List>
      </CardContent>
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardActions disableSpacing sx={{ display: 'flex' }}>
          <IconButton aria-label="add to favorites" sx={{ color: '#1E88E5' }}>
            <ImageIcon sx={{ color: '#1E88E5' }} />
          </IconButton>
          <Box sx={{ width: 500, maxWidth: '100%' }}>
            <TextField fullWidth label="Create message" {...register('content')} />
          </Box>
          <IconButton type='submit' aria-label="add to favorites" sx={{ color: '#1E88E5' }}>
            <SendIcon sx={{ color: '#1E88E5' }} />
          </IconButton>
        </CardActions>
      </form>
    </Card>
  );
}
export default Boite_disscussion;
