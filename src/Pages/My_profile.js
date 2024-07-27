// src/components/MyProfile.js

import React, { useEffect, useState } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMediaQuery } from '@mui/material';
import { useUpdateUserMutation } from '../redux/api/postApi';
import { toast } from 'react-toastify';
import FormData from 'form-data';
import { logout } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export default function MyProfile() {
  const isMaxWidth550 = useMediaQuery('(max-width:550px)');
  const [updateUser, { isSuccess, isError, isLoading }] = useUpdateUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.user);
  const schema = yup.object().shape({
    username: yup.string().required("Le nom d'utilisateur est requis"),
    email: yup.string().email("L'email n'est pas valide").required("L'email est requis"),
    profilePicture: yup.mixed().required("La photo de profil est requise"),
    coverPicture: yup.mixed().required("La photo de couverture est requise"),
  });

  const { handleSubmit, control, formState: { errors, isDirty, isValid }, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: user?.username,
      email: user?.email,
      profilePicture: user?.profilePicture,
      coverPicture: user?.coverPicture,
    },
    mode: 'onSubmit',
  });

  const token = JSON.parse(localStorage.getItem('token'));
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);
  const [imagesDirty, setImagesDirty] = useState(false);

  const onSubmit = async (data) => {
    let formData = new FormData();
    formData.append('username', data.username);
    formData.append('email', data.email);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }else{
      formData.append('profilePicture', data.profilePicture);
    }
    if (coverPicture) {
      formData.append('coverPicture', coverPicture);
    }else{
      formData.append('coverPicture', data.coverPicture);
    }
    console.log('data', data);
    updateUser({ token, user_id: user._id, data: formData });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Profil mis à jour avec succès!');   
        dispatch(logout());
        navigate('/login');
    }
    if (isError) {
      toast.error('Échec de la mise à jour du profil.');
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    setImagesDirty(!!profilePicture || !!coverPicture);
  }, [profilePicture, coverPicture]);

  return (
    <Box sx={{ flex: 1, width: '100%', marginTop: '40px' }}>
      <Stack
        spacing={4}
        sx={{
          display: 'flex',
          maxWidth: '800px',
          mx: 'auto',
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
        component='form'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Informations personnelles</Typography>
            <Typography level="body-sm">
              Personnalisez comment les informations de votre profil apparaîtront sur les réseaux.
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '40px' }}>
            {/* Profile Picture Upload */}
            <Box sx={{ display: 'flex', flexDirection: 'row', border: '2px solid black', width: '80%' }}>
              <Typography>Éditer la photo de profil</Typography>
              <Controller
                name="profilePicture"
                control={control}
                render={({ field }) => (
                  <IconButton component="label" aria-label="upload profile picture">
                    <EditRoundedIcon />
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => {
                        setProfilePicture(e.target.files[0]);
                        setValue("profilePicture", e.target.files[0]);
                      }}
                    />
                  </IconButton>
                )}
              />
              {errors.profilePicture && <FormHelperText error>{errors.profilePicture.message}</FormHelperText>}
            </Box>

            {/* Cover Picture Upload */}
            <Box sx={{ display: 'flex', flexDirection: 'row', border: '2px solid black', width: '80%' }}>
              <Typography>Éditer la photo de couverture</Typography>
              <Controller
                name="coverPicture"
                control={control}
                render={({ field }) => (
                  <IconButton component="label" aria-label="upload cover picture">
                    <EditRoundedIcon />
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => {
                        setCoverPicture(e.target.files[0]);
                        setValue("coverPicture", e.target.files[0]);
                      }}
                    />
                  </IconButton>
                )}
              />
              {errors.coverPicture && <FormHelperText error>{errors.coverPicture.message}</FormHelperText>}
            </Box>

            {/* Username Field */}
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <FormControl error={Boolean(errors.username)}>
                  <FormLabel>Nom d'utilisateur</FormLabel>
                  <Input {...field} sx={{ width: '80%' }} placeholder="Nom d'utilisateur" />
                  {errors.username && <FormHelperText>{errors.username.message}</FormHelperText>}
                </FormControl>
              )}
            />

            {/* Email Field */}
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <FormControl error={Boolean(errors.email)}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    {...field}
                    sx={{ width: '80%' }}
                    type="email"
                    startDecorator={<EmailRoundedIcon />}
                    placeholder="Email"
                  />
                  {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
                </FormControl>
              )}
            />
          </Box>

          <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
              <Button disabled={!isValid || (!isDirty && !imagesDirty)} size="sm" variant="solid" type="submit">
                Enregistrer
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  );
}
