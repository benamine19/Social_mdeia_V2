import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Commentaire from './Commentaire';
export default function AlignItemsList() {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <Commentaire/>
      <Divider variant="inset" component="li" />
      <Commentaire/>
      <Divider variant="inset" component="li" />
      <Commentaire/>
    </List>
  );
}
