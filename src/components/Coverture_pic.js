import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Box } from '@mui/material';
import Profile_pic from './Profile_pic';
import { URL } from '../url';
import {Dialog, DialogTitle, DialogContent} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
function Coverture_pic({coverPicture,profilePicture}) {
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
       <Box sx={{ position: 'relative', width: '70%', marginLeft: 'auto', marginRight: 'auto', marginTop: '18px' }}>
       <Card sx={{ height: 300 }}>
         <CardMedia
           sx={{ height: '100%' }}
           image={`${URL}/uploads/${coverPicture}`}
           title="green iguana"
           onClick={() => handleClickOpen(`${URL}/uploads/${coverPicture}`)}
           style={{ 
             cursor: 'pointer', 
             objectFit: 'contain', // Cette ligne permet de s'assurer que l'image conserve son aspect ratio.
             maxHeight: '400px', // Ajustez cette valeur selon vos besoins
             maxWidth: '100%' // Pour s'assurer que l'image ne dépasse pas la largeur du conteneur
            }}
         />
       </Card>
       <Profile_pic  profilePicture={profilePicture} />
     </Box>
     <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
     <DialogTitle sx={{display:'flex',justifyContent:'end',alignItems:'start'}}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 1,
              top: 1,
              color: (theme) => theme.palette.grey[500],
            }}
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

  )
}

export default Coverture_pic