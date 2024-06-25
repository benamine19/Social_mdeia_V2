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

function Messsage_moi() {
  return (
    <div>
             <ListItem>
                    <Grid container spacing={0}  justifyContent="flex-end">
                            
                            <Grid item xs={10} sx={{ border: '1px solid #ccc', borderRadius: '24px', padding: '8px' ,backgroundColor:'#1E88E5'}}>
                            <Typography variant="subtitle2" gutterBottom sx={{ color: 'white' }}>
                                subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                                blanditiis tenetur
                            </Typography>
                            </Grid>
                    </Grid>   
            </ListItem>
    </div>
  )
}

export default Messsage_moi