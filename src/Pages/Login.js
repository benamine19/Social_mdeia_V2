import React from 'react';
import { Container, Box, Typography, TextField, Button, Avatar, CssBaseline, Grid,useMediaQuery, Link as MuiLink } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { schemaLogin } from '../config/formConfig';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser} from '../redux/slices/userSlice';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const theme = createTheme();

function Login() {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemaLogin),
    mode: 'onSubmit',
  });
  const { loading, loginError} = useSelector((state) => state.user);
  const navigate = useNavigate()

  const onSubmit = ({ email, password }) => {
    dispatch(LoginUser({ email, password })).then(result=>{
      if(result.payload.message === 'Login success') {
        // toast.success('Login successful!');
        navigate('/')
      }else{
        toast.error(result.payload.message || 'Login failed');
      }
    });
  };
  const isMinWidth450 = useMediaQuery('(min-width:450px)');


  return (
  
    <Container  sx={{height:'600px',order:'2',backgroundColor:'white', borderTopLeftRadius: '20px',borderTopRightRadius: '20px',  borderBottomLeftRadius:  '20px',borderBottomRightRadius:  '20px',width:isMinWidth450?'400px':'100%',marginTop:isMinWidth450?'40px':'10px'}}>
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
          <Typography component="h1" variant="h6" sx={{margin:'8px',fontFamily:'Zen Kaku Gothic Antique',fontWeight:'30px',color:'#2856B4'}}>
          Sign in with your account 
          </Typography>
          
          <Box sx={{marginLeft:'8px',width:'100%'}} component="form" onSubmit={handleSubmit(onSubmit)} noValidate>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register('email', { required: true })}
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register('password', { required: true, minLength: 3 })}
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
           {loginError ?  <Typography component="div" variant="subtitle2" sx={{ color: 'red' }}>
              {loginError}
            </Typography>: ''}
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
            <Grid container>
              <Grid item xs>
                 <MuiLink sx={{color:'#3A68C7'}} component={Link} to="/signup" variant="body2">
                   {"Forgot password?"}
                 </MuiLink>
              </Grid>
              <Grid item>
              <MuiLink sx={{color:'#3A68C7'}} component={Link} to="/signup" variant="body2">
                   {"Don't have an account? Sign Up"}
              </MuiLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

export default Login;