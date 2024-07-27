import React, { useState } from 'react';
import { Box, Card, CardMedia } from '@mui/material';
import { URL } from '../url';
import {Dialog, DialogTitle, DialogContent} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

function Profile_pic({profilePicture}) {
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const handleClickOpen = (image) => {
    setCurrentImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentImage(null);
  };




  return (
    <>
    <Card sx={{ width: '50%', height: 200, position: 'absolute', bottom: '-25px', left: '25%', transform: 'translateX(-50%)', border: '5px solid white', overflow: 'hidden',borderRadius:'100%' }}>
      <CardMedia
           sx={{ height: '100%' }}
        image={`${URL}/uploads/${profilePicture}`}
        title="green iguana"
        onClick={() => handleClickOpen(`${URL}/uploads/${profilePicture}`)}
        style={{ 
          cursor: 'pointer', 
          objectFit: 'contain', // Cette ligne permet de s'assurer que l'image conserve son aspect ratio.
          maxHeight: '400px', // Ajustez cette valeur selon vos besoins
          maxWidth: '100%' // Pour s'assurer que l'image ne dépasse pas la largeur du conteneur
        }}
      />
    </Card>
     <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
     <DialogTitle sx={{display:'flex',justifyContent:'end',alignItems:'start'}}>
       <IconButton
         aria-label="close"
         onClick={handleClose}
       >
         <CloseIcon />
       </IconButton>
     </DialogTitle>
     <DialogContent dividers>
       <Box
         component="img"
         src={currentImage}
         alt=""
         style={{
           width: '100%',
           height: 'auto',
           objectFit: 'contain', // Cette ligne permet de s'assurer que l'image conserve son aspect ratio.
           maxHeight: '400px', // Ajustez cette valeur selon vos besoins
           maxWidth: '100%' // Pour s'assurer que l'image ne dépasse pas la largeur du conteneur
         }
         }
       />
     </DialogContent>
   </Dialog>
   </>
  );
}

export default Profile_pic;