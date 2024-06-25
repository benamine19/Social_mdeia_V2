import React from 'react'
import Card from '@mui/material/Card';
import { Box, Divider, IconButton, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
const CustomTextField = styled(TextField)({
    '& .MuiFilledInput-root': {
      borderRadius: 25,
      backgroundColor: '#f5f5f5', // Couleur de fond si nécessaire
      '&:before': {
        borderBottom: '1px solid rgba(0, 0, 0, 0.8)', // Couleur et épaisseur de la ligne avant focus
        left: '18px',
        right: '18px',
    },
      '&:after': {
        borderBottom: '3px solid #1E88E5', // Couleur et épaisseur de la ligne après focus
        left: '14px',
        right: '14px', 
    },
      '&:hover:not(.Mui-disabled):before': {
        borderBottom: '1px solid rgba(0, 0, 0, 0.87)', // Couleur et épaisseur de la ligne lors du survol
      },
    },
    '& .MuiFilledInput-input': {
      padding: '2px 10px', // Ajustement des padding si nécessaire
    },
  });




function Add_post() {
  return (
    <Card sx={{minWidth:'50%', maxWidth: '70%' ,backgroundColor:'#F7F3F3',margin:'80px'}}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center', pl: 1, pb: 1 }}>
            <Avatar sx={{ bgcolor: blue[500],width: '57px',height: '57px',marginRight:'4px' }} aria-label="recipe">
                     R
            </Avatar>
             <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '45ch' },
                }}
                noValidate
                autoComplete="off"
                >
                <CustomTextField
                    id="filled-multiline-flexible"
                    label="Que voulez-vous partager ?"
                    multiline
                    maxRows={4}
                    variant="filled"
                />
            </Box>
        </Box>
        <Divider sx={{marginBottom:'20px',marginTop:'20px'}}/>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center', pl: 1, pb: 1 }}>
                
                <IconButton sx={{color: '#1E88E5' }}>
                    <AddPhotoAlternateIcon sx={{ fontSize: 40 }}/>
                </IconButton>
                <IconButton sx={{color: '#1E88E5' }}>
                    <AddLocationAltIcon sx={{ fontSize: 40 }}/>
                </IconButton>
        </Box>


    </Card>   
  )
}

export default Add_post