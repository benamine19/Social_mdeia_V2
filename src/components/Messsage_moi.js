import React from 'react'
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import {Grid} from '@mui/material';


function Messsage_moi({key,message}) {
  return (
    <div key={key}>
             <ListItem>
                    <Grid container spacing={0}  justifyContent="flex-end">
                            
                            <Grid item xs={10} sx={{ border: '1px solid #ccc', borderRadius: '24px', padding: '8px' ,backgroundColor:'#1E88E5'}}>
                            <Typography variant="subtitle2" gutterBottom sx={{ color: 'white' }}>
                            {message.content}
                              
                            </Typography>
                            </Grid>
                    </Grid>   
            </ListItem>
    </div>
  )
}

export default Messsage_moi