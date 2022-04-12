import { ErrorOutline } from '@mui/icons-material';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import NextLink from 'next/link'
import { useRouter } from "next/router";
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../../components/layouts/AuthLayout'
import { AuthContext } from "../../context/auth/AuthContext";

export default function LoginPage() {
  const {loginUser} = useContext(AuthContext);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onLoginUser = async({email, password}) => {
    setShowError(false);
    const {hasError, message} = await loginUser(email, password);
    
    if (hasError) {
      setShowError(true);
      setErrorMessage(message)
      return;
    } 
  }

  return (
    <AuthLayout title='Login'>
      <form onSubmit={handleSubmit(onLoginUser)}>
        <Box sx={{width: 350, padding:"10px 20px"}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" component="h5">Sign in to continue</Typography>
              <Chip
                label={errorMessage}
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{display: showError ? 'flex' : 'none', mt: 1}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                  type="email"
                  label="Email" 
                  variant="filled" 
                  fullWidth
                  {
                    ...register('email', {
                      required: 'The email is required',
                    })
                  }
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                  type="password" 
                  label="Password" 
                  variant="filled" 
                  fullWidth
                  {...register('password', {
                    required: 'The password is required',
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" color="secondary" className="circular-btn" size="large" fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='end'>
              <NextLink href={`/auth/register`} passHref>
                <Link underline="always">
                  Don't have an account?
                </Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}