import React from 'react'
import Login from './Login'
import { Box, Typography, useMediaQuery } from '@mui/material'
import image from '../images/social_media.jpg'
import Carousel from 'react-material-ui-carousel'

function LoginPage() {
    const isMinWidth450 = useMediaQuery('(min-width:450px)');
    var items = [
        {
            name: "Send Message in Real-Time",
            description: "Allows users to send messages instantly using WebSocket for real-time communication."
        },
        {
            name: "View Posts",
            description: "Displays posts from users, fetched from a backend server like Express.js."
        },
        {
            name: "Like and Comment on Posts",
            description: "Enables users to interact with posts by liking them and leaving comments."
        },
        {
            name: "Follow and Unfollow Users",
            description: "Functionality to follow or unfollow other users to see their updates."
        }
    ];
  
  return (
    <Box style={{width:'100%',height:'120vh',backgroundPosition:'center',backgroundImage:`url(${image})`,backgroundSize:'contain'}}>
        <Box sx={{width:'100%',height:'120vh',backgroundColor:'#19191a90',display:'flex',flexDirection:isMinWidth450?'row':'column',justifyContent:'space-between',gap:'20px'}}>
              <Box sx={{order:'1',display:'flex',flexDirection:'column',width:'60%',alignItems:'center',justifyContent:'center',gap:'30px',marginLeft:'auto',marginRight:'auto'}}>
                     <Typography variant="h4"  sx={{color:'white',fontFamily:'Zen Kaku Gothic Antique'}}>
                          Socail media App
                      </Typography>
                  <Carousel 
                        sx={{display:'flex',flexDirection:'column',width:isMinWidth450?'50%':'100%',height:'200px',justifyContent:'space-between'}}>
                            {
                                items.map( (item, i) => ( <Box sx={{display:'flex',flexDirection:'column',justifyContent:'space-around',gap:'10px',paddingBottom:'20px'}} >
                                                                    <Typography variant="h5" sx={{color:'white'}}>
                                                                        {item.name}
                                                                    </Typography>
                                                                    <Typography variant="body2" sx={{color:'white'}}>
                                                                            {item.description}  
                                                                    </Typography>
                                                        </Box>) )
                            }
                        </Carousel>
          </Box>
          <Login/>
    </Box>
</Box>
  )
}

export default LoginPage