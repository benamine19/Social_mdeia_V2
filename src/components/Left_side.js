import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Box, Grid, Paper, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import Input_search from './Input_search';
import Suggestion_amis from './Suggestion_amis';
export default function Left_side() {
  return (
    <Grid item md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Paper sx={{ padding: 2,  }}>
           <List>
            <ListItem>
                    <Suggestion_amis/>
            </ListItem>
            <Divider />
            <ListItem>
                    <Suggestion_amis/>
            </ListItem>
            <Divider />
            <ListItem>
                    <Suggestion_amis/>
            </ListItem>

           </List>

        </Paper>
    </Grid>
  );
}