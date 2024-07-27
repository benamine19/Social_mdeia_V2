import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Box, Container, Grid} from '@mui/material';
import { styled } from '@mui/material/styles';
import { URL } from '../url';




function Message_lui({profilePicture,message,key}) {
  return (
    <div key={key}>
    <ListItem>
               <Box sx={{display: 'flex',alignItems: 'center'}}>
                    <ListItemAvatar>
                        <Avatar  src={`${URL}/uploads/${profilePicture}`} alt="Profile Picture" />
                    </ListItemAvatar>
                     <Container  sx={{ border: '1px solid #ccc', borderRadius: '24px', backgroundColor: '#EBE7E7' }}>
                            <Typography variant="subtitle2" gutterBottom>
                                          {message.content}
                            </Typography>
                    </Container>
               </Box>
    </ListItem>
    </div>
  )
}

export default Message_lui











{/* <Typography
sx={{ display: 'inline' }}
component="span"
variant="body2"
color="text.primary"
> */}



{/* <ListItem sx={{ paddingLeft: 0, paddingRight: 0 }}>
      <Grid container spacing={1} alignItems="center" direction={'row'}>
        <Grid item xs={1} sx={{ paddingLeft: 0 }}>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
        </Grid>
        <Grid item xs={11} sx={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px', backgroundColor: '#EBE7E7' }}>
          <Typography variant="subtitle2" gutterBottom>
            subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
          </Typography>
        </Grid>
      </Grid>
    </ListItem> */}