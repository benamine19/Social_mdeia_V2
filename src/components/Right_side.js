import React from 'react'
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Input_search from './Input_search';
import ContactsIcon from '@mui/icons-material/Contacts';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import GroupIcon from '@mui/icons-material/Group';
function Right_side() {
  return (
    <Grid item md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Paper sx={{ padding: 2, height: '100vh' }}>
              <Grid container spacing={0} alignItems="center">
                <Grid item xs={2}>
                  <GroupIcon />
                </Grid>
                <Grid item xs={10}>
                  <Input_search />
                </Grid>
              </Grid>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <Divider/>
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                          </ListItemAvatar>
                          <ListItemText
                            primary="Benali Amine"
                            secondary="en ligne"      />
                        </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                          </ListItemAvatar>
                          <ListItemText
                            primary="Benali Amine"
                            secondary="en ligne"      />
                        </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                          </ListItemAvatar>
                          <ListItemText
                            primary="Benali Amine"
                            secondary="en ligne"      />
                        </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                          </ListItemAvatar>
                          <ListItemText
                            primary="Benali Amine"
                            secondary="en ligne"      />
                        </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                          </ListItemAvatar>
                          <ListItemText
                            primary="Benali Amine"
                            secondary="en ligne"      />
                        </ListItem>
      <Divider variant="middle" component="li" />








                  </List>
        </Paper>
  </Grid>
  )
}

export default Right_side