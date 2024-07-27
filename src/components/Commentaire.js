import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { URL } from '../url';
import { Box } from '@mui/material';
export default function Commentaire({comment}) {
  return (
      <ListItem key={comment._id} alignItems="flex-start">
        <ListItemAvatar>
        <Avatar  src={`${URL}/uploads/${comment.user.profilePicture}`} alt="Profile Picture" />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Box >
             {comment.user.username}
            <Typography variant="body2" color="text.secondary">
                  {comment.createdAt}
            </Typography>
            </Box>
          }
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
              {comment.content }
              </Typography>
              
            </React.Fragment>

          }
        />
      </ListItem>
    
  
  );
}
