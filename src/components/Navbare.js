import * as React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import _ from 'lodash';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Notification_drop_down from './Notification_drop_down';
import { logout } from '../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { URL } from '../url';
import { Avatar, Button, DialogContent,DialogTitle, Divider, List, ListItem, ListItemAvatar, ListItemText, useMediaQuery } from '@mui/material';
import { useGetNotificationsQuery, useMarkAllAsReadMutation } from '../redux/api/notificationApi';
import { CustomDialog, Search ,SearchIconWrapper,StyledInputBase} from './setting_navbare';
import { useSearchUserQuery } from '../redux/api/friendApi';
import { go_profile_other_user, go_profile_user_current } from '../redux/slices/profileSlice';



export default function PrimarySearchAppBar() {

  const isMinWidth600 = useMediaQuery('(min-width:600px)');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);
  const [messageAnchorEl, setMessageAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isNotificationMenuOpen = Boolean(notificationAnchorEl);
  const isMessageMenuOpen = Boolean(messageAnchorEl);
  const [searchTerm, setSearchTerm] = React.useState('');
  // for search 
  const [openDialogue, setOpenDialogue] = React.useState(false);
  
  const handleClickOpenDialogue = () => {
    setOpenDialogue(true);
  };

  const handleCloseDialogue = () => {
    setOpenDialogue(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user);
  const token = JSON.parse(localStorage.getItem('token')); 
  const { data, error, isLoading} = useGetNotificationsQuery({ token });
  const [markAllAsRead, { isSuccess, isError }] = useMarkAllAsReadMutation();
  
  const { data:searchUserdata,error:ssearchUsererror, isLoading:searchUserloading} = useSearchUserQuery({token,searchTerm});
  const debouncedSearch = React.useCallback(
    _.debounce((query) => {
      setSearchTerm(query);
    }, 500), // 300 ms de délai, ajustez selon vos besoins
    []
  );
  const handleSearchChange = (event) => {
    debouncedSearch(event.target.value);
  };


  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };
  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
    markAllAsRead({token})
  }
  const handleMessageMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };
  const handleMessageMenuClose = () => {
    setNotificationAnchorEl(null);
  }
  const clickLogout=()=>{
    handleMenuClose()
    dispatch(logout());
    navigate('/login');
  }



  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      style={{ marginTop: '50px' }} 
    >
      <MenuItem onClick={()=>{
        handleMenuClose()
        dispatch(go_profile_user_current());
        navigate('/profile')
        }}>Profile</MenuItem>
      <MenuItem onClick={()=>{handleMenuClose()
        navigate('/myprofile')
      }}>My account</MenuItem>
       <MenuItem onClick={()=>{handleMenuClose()
        navigate('/Findfriends')
      }}>find_friends</MenuItem>
      <MenuItem onClick={clickLogout}>Logout</MenuItem>
    </Menu>
  );


  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
  <React.Fragment>
      <Box sx={{ flexGrow: 1}} style={{position:'fixed',width:'100%',top:'0',left:'0',zIndex:'99'}}>
      <AppBar position="static" sx={{backgroundColor:'#0b4e91'}}>
        <Toolbar sx={{display:'flex',flexDirection:isMinWidth600?'flex':'column',justifyContent:'space-between',alignItems:'center'}}>
                {/* 1 er partie de navbare  logo + search */}
                <Box sx={{display:'flex',width:isMinWidth600?'40%':'100%',justifyContent:'space-between'}}>
                        {/* logo */}
                      <Typography
                        variant="h6"
                      
                        component="div"
                      >
                      AM
                      </Typography>
                    {/* logo */}
                    {/* search */}
                      <Search onClick={handleClickOpenDialogue}>
                        <SearchIconWrapper>
                          <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                          placeholder="Search…"
                          inputProps={{ 'aria-label': 'search' }}
                        />
                      </Search>
                    {/* search */}
                  </Box>
                {/* 1 er partie de navbare  logo + search */}
                
    
                {/* 2 eme partie de navbare  logo + search */}
                  {/* button de navigation */}
                    <Box sx={{width:isMinWidth600?'45%':'100%',display:'flex',justifyContent:'space-between'}}>
                       
                      <BottomNavigation sx={{width:'50%', backgroundColor: "inherit"}}   value={value} onChange={handleChange}>
                              <BottomNavigationAction onClick={()=>{navigate('/')}}  sx={{ color: "white", "&.Mui-selected": {     color: "white" }}} label="home" value="home"icon={<HomeIcon  />}/>
                              <BottomNavigationAction onClick={()=>{navigate('/myfriends')}}  sx={{ color: "white", "&.Mui-selected": {    color: "white" }}}  style={{color:'white'}}  label="friends" value="friends"icon={<GroupIcon  />}/>
                      </BottomNavigation>
        
                  
                      <Box sx={{width:'50%',display:'flex',justifyContent:'space-around'}}>
                            <IconButton size="large" aria-label="show 17 new notifications" color="inherit" onClick={handleNotificationMenuOpen} >
                              <Badge badgeContent={data?.unreadCount} color="error">
                                <NotificationsIcon />
                              </Badge>
                            </IconButton>
                            <IconButton size="large" edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit"  >
                                  <Avatar sx={{ width: '34px', height: '33px' }} src={user && user.profilePicture ? `${URL}/uploads/${user.profilePicture}` : null} alt="Profile Picture"/>   
                            </IconButton>
                        </Box>
                    </Box>
                  {/* button de navigation */}
                {/* 2 eme partie de navbare  logo + search */}
          </Toolbar>
      </AppBar>
     
     
     
     
     
      {renderMenu}
      <Menu
          anchorEl={notificationAnchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          id="notification-menu"
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isNotificationMenuOpen}
          onClose={handleNotificationMenuClose}
          style={{ marginTop: '50px' }} 
        >
          <Notification_drop_down notifications={data?.notifications} />
    </Menu>
    <Menu
          anchorEl={messageAnchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          id="notification-menu"
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isMessageMenuOpen}
          onClose={handleMessageMenuClose} 
          style={{ marginTop: '50px' }} 
        >
          <Notification_drop_down notifications={data?.notifications} />
    </Menu>
   </Box>
   <CustomDialog maxWidth='xl' open={openDialogue} onClose={handleCloseDialogue} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
              <DialogTitle >
                      {"Search any thing's about users"}
              </DialogTitle>
              <DialogContent>
                  <Box sx={{display:'flex',flexDirection:'column'}}>
                  <Search >
                              <SearchIconWrapper>
                                <SearchIcon />
                              </SearchIconWrapper>
                              <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={handleSearchChange}
                              />
                 </Search>
                 <Box sx={{ marginTop:'25px',display:'flex',flexDirection:'column',backgroundColor:'white' ,minHeight:'350px'}}>
                     <List>
                     {searchUserdata && searchUserdata.map((user)=>{
                        return(
                         <React.Fragment key={user._id}>
                              <Button sx={{ width: '100%' }} 
                               style={{cursor:'pointer'}}
                               onClick={()=>{dispatch(go_profile_other_user({profile_owner:user._id}))
                               navigate('/profile')}}
                              >
                                <ListItem alignItems="flex-start">
                                  <ListItemAvatar>
                                    <Avatar alt={user?.username} src={user && user?.profilePicture ? `${URL}/uploads/${user.profilePicture}` : null } />
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={user.username}                                 
                                  />
                                </ListItem>
                              </Button>
                              <Divider variant="middle" component="li" />
                        </React.Fragment>
                        )
                      })}
                     </List>
                 </Box>
                </Box>
              </DialogContent>
    </CustomDialog>
  </React.Fragment>
  );
}
