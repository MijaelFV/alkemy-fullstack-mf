import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material'
import NextLink from 'next/link'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../../components/layouts/AuthLayout'
import ErrorSign from "../../components/ui/ErrorSign";
import { AuthContext } from "../../context/auth/AuthContext";

export default function RegisterPage() {
  const {registerUser} = useContext(AuthContext);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onRegisterUser = async({name, email, password, password2}) => {
    setShowError(false);
    const {hasError, message} = await registerUser(name, email, password, password2);
    
    if (hasError) {
      setShowError(true);
      setErrorMessage(message)
      return;
    } 
  }

  return (
    <AuthLayout title='Register'>
      <form onSubmit={handleSubmit(onRegisterUser)}>
        <Box sx={{width: 350, padding:"10px 20px"}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" component="h5">New account</Typography>
              <ErrorSign showError={showError} errorMessage={errorMessage} />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                type="text"
                label="First name" 
                variant="filled" 
                fullWidth
                {
                  ...register('name', {
                    required: 'First name is required',
                  })
                }
                error={!!errors.name}
                helperText={errors.name?.message}
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
              <TextField 
                  type="password" 
                  label="Repeat password" 
                  variant="filled" 
                  fullWidth
                  {...register('password2', {
                    required: 'Repeat password is required',
                  })}
                  error={!!errors.password2}
                  helperText={errors.password2?.message}
                />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" color="secondary" className="circular-btn" size="large" fullWidth>
                Register
              </Button>
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='end'>
              <NextLink href={`/auth/login`} passHref>
                <Link underline="always">
                  Already have an account?
                </Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}