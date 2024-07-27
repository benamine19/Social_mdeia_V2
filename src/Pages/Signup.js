import React from 'react';
// importation pour Materail UI
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Container, Box, Typography, TextField, Button, Avatar, CssBaseline, Grid, Link as MuiLink, CircularProgress, useMediaQuery, Divider  } from '@mui/material';

// importation pour react_hook_form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { schemaSignup } from '../config/formConfig';

// importation pour react_router
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// importation pour redux
import { useDispatch, useSelector } from 'react-redux';
import { RegisterUser } from '../redux/slices/userSlice';

const theme = createTheme();




function Signup() {

  // intialisation pour react_router
  const navigate = useNavigate()

  // intialisation pour redux
  const dispatch = useDispatch();
  const { loading, registerError} = useSelector((state) => state.user);


  // intialisation pour react_hook_form
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemaSignup),
    mode: 'onSubmit',
  });
  

  // function pour redux 
  const onSubmit = ({username,email,password}) => {
    dispatch(RegisterUser({username,email,password})).then(res =>{
      if(res.payload.message === 'user created with sucess') {
        navigate('/login')
      }
    })
  };
  const isMinWidth450 = useMediaQuery('(min-width:450px)');
  
  return (
      <Container  sx={{height:'auto',order:'2',backgroundColor:'white', borderTopLeftRadius: '20px',borderTopRightRadius: '20px',  borderBottomLeftRadius:  '20px',borderBottomRightRadius:  '20px',width:isMinWidth450?'400px':'100%'}}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            paddingTop:'12px'
          }}
        >
          <Typography variant="body2" sx={{marginLeft:'8px',fontFamily:'Zen Kaku Gothic Antique',fontWeight:'12.8',color:'#2856B4'}}>
             LET'S GET YOU STARTED
          </Typography>
          <Typography component="h1" variant="h6" sx={{margin:'8px',fontFamily:'Zen Kaku Gothic Antique',fontWeight:'25px',color:'#2856B4'}}>
          Create an Account
          </Typography>
          <Box sx={{marginLeft:'8px',width:'100%'}} component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Box sx={{display:'flex',justifyContent:'space-between',flexDirection:'column',gap:'18px'}}>
              <Box >
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="name"
                  autoFocus
                  {...register('username')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#3A68C7', // Couleur de la bordure après le focus
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#3A68C7', // Couleur de la bordure au survol
                      },
                      '& .Mui-focused': {
                        borderColor: '#3A68C7', // Couleur de la bordure pour l'état initial aussi
                      },
                      borderColor: '#2856B4', // Couleur de la bordure initiale
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#3A68C7', // Couleur du texte du label après le focus
                    },
                  }}
                />
                <Typography component="span" variant="subtitle2" sx={{ color: 'red' }}>
                  {errors.name?.message}
                </Typography>
              </Box>
              <Box>
                <TextField
                  required
                  fullWidth
                  type='email'
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register('email')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#3A68C7', // Couleur de la bordure après le focus
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#3A68C7', // Couleur de la bordure au survol
                      },
                      '& .Mui-focused': {
                        borderColor: '#3A68C7', // Couleur de la bordure pour l'état initial aussi
                      },
                      borderColor: '#2856B4', // Couleur de la bordure initiale
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#3A68C7', // Couleur du texte du label après le focus
                    },
                  }}
                />
                <Typography component="span" variant="subtitle2" sx={{ color: 'red' }}>
                  {errors.email?.message}
                  {errors.email && errors.email.message}

                </Typography>
              </Box>
              <Box>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register('password')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#3A68C7', // Couleur de la bordure après le focus
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#3A68C7', // Couleur de la bordure au survol
                      },
                      '& .Mui-focused': {
                        borderColor: '#3A68C7', // Couleur de la bordure pour l'état initial aussi
                      },
                      borderColor: '#2856B4', // Couleur de la bordure initiale
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#3A68C7', // Couleur du texte du label après le focus
                    },
                  }}
                />
                <Typography component="span" variant="subtitle2" sx={{ color: 'red' }}>
                  {errors.password?.message}
                </Typography>
                {registerError ?  <Typography component="div" variant="subtitle2" sx={{ color: 'red' }}>
                    {registerError}
                </Typography>: ''}
              </Box>
            </Box>
              {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '12px', marginBottom: '18px' }}>
                <CircularProgress />
              </Box>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: '30px',
                  height: '56px',
                  backgroundColor: '#3A68C7',
                  '&:hover': {
                    backgroundColor: '#3A68C7', // Couleur de fond au survol
                  },
                }}
              >
                Sign In
              </Button>
            )}

            <Divider/>
            <Grid container justifyContent="center" sx={{marginTop:'30px' ,marginBottom:'30px'}}>
              <Grid item>
                <MuiLink component={Link} sx={{color:'#3A68C7'}} to="/login" variant="body1">
                   {" Already have an account ? Sign in"}
              </MuiLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

export default Signup;