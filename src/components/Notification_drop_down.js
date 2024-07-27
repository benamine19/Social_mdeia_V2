import React, { Fragment } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

function Notification_drop_down({ notifications }) {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: '#FAF2F2', maxHeight: 300, overflowY: 'auto' }}>
      {notifications && notifications.map((notification) => (
        <Fragment key={notification._id}>
          <ListItem alignItems="flex-start" sx={{ backgroundColor: notification.read ? '#E8F5B0' : '#FFC0CB' }}>
            <ListItemAvatar>
              <Avatar alt="Notification Icon" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={notification.type === 'message' ? 'Nouveau message' : 'Nouvelle invitation'}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {notification.content}
                  </Typography>
                  <Typography
                    sx={{ display: 'block' }}
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                    {new Date(notification.createdAt).toLocaleString()}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </Fragment>
      ))}
    </List>
  );
}

export default Notification_drop_down;
