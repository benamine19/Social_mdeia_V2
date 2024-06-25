import React ,{ useRef } from 'react'
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
import { blue } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { Container, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Message_lui from './Message_lui';
import Messsage_moi from './Messsage_moi';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ImageIcon from '@mui/icons-material/Image';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function Boite_disscussion() {
  const contentRef = useRef(null);

  const handleScrollToBottom = () => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  };

  return (
    <Card sx={{ maxWidth: 345, position: 'relative' }}>
      <CardHeader
      sx={{height:'40px'}}
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
            A
          </Avatar>
        }
        action={
          <Box sx={{display: 'flex',flexDirection: 'row',p: 1,m: 1, borderRadius: 1}}>
                  <IconButton sx={{ color: '#1E88E5' }} >
                      <RemoveIcon />
                    </IconButton>
                    <IconButton sx={{ color: '#1E88E5' }}>
                      <CloseIcon />
                    </IconButton>
          </Box>
        }
        title="Benali amine"
      />
      <Divider/>

      <CardContent ref={contentRef} sx={{padding:'0px', maxHeight: 300, overflowY: 'auto' }} >
        
       <IconButton  sx={{ color: '#1E88E5', position: 'absolute', zIndex: 99, right: 3, top: 190,backgroundColor:'#A2D2F4' }} onClick={handleScrollToBottom}>
          <ArrowDownwardIcon sx={{ color: '#1E88E5', }} />
        </IconButton>
      
        <List>
          <Message_lui/>
          <Messsage_moi/>
          <Message_lui/>
          <Messsage_moi/>
          <Messsage_moi/>
          <Message_lui/>
          <Messsage_moi/>
          <Message_lui/>
          <Messsage_moi/>
          <Messsage_moi/>
        </List>
       

      </CardContent>
      <Divider/>
      <form>
      <CardActions disableSpacing sx={{display:'flex'}}>
              
                <IconButton aria-label="add to favorites" sx={{color: '#1E88E5'}}  >
                          <ImageIcon sx={{color: '#1E88E5'}} />
                  </IconButton>
                  <Box sx={{ width: 500, maxWidth: '100%', }}>
                    <TextField fullWidth label="crate message"  />
                  </Box>
                  {/* <IconButton aria-label="add to favorites" sx={{color: '#1E88E5'}} >
                    <ThumbUpOutlinedIcon sx={{color: '#1E88E5'}}  />
                  </IconButton> */}
                  <IconButton aria-label="add to favorites" sx={{color: '#1E88E5'}} >
                    <SendIcon sx={{color: '#1E88E5'}}  />
                  </IconButton>
      </CardActions>
      </form>

    </Card>
  )
}

export default Boite_disscussion