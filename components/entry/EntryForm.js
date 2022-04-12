import { ErrorOutline } from "@mui/icons-material";
import { Box, Button, Chip, FormControl, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UiContext } from "../../context/ui/UiContext";

export const EntryForm = () => {

  const { reset, register, handleSubmit, formState: { errors } } = useForm();

  const {setDrawerForm, drawerForm, toggleDrawer} = useContext(UiContext)

  const handleCancel = () => {
    if (drawerForm === "create") {
      toggleDrawer()
    }
    
    setDrawerForm('none')
    reset()
  }

  const onCreateEntry = async({email, password}) => {
    
  }

  const onEditEntry = async({email, password}) => {

  }

  return (
    <form onSubmit={handleSubmit(onCreateEntry)}>
      <Box className="fadeIn" sx={{mx:"5px", my: "20px"}}>
        <Grid container spacing={3}>
          <Grid item xs={12} gap="10px" display="flex" alignItems="center">
            <Typography variant="h5">{drawerForm === 'edit' ? 'Edit entry' : 'Create entry'}</Typography>
          </Grid>
          <Grid item xs={12} sm={drawerForm === 'create' ? 12 : 6}>
            <TextField
              type="text"
              label="Concept" 
              variant="filled" 
              fullWidth
              {
                ...register('concept', {
                  required: 'The concept is required',
                  minLength: {value: 2, message: 'Minimum 2 characters'}
                })
              }
              error={!!errors.concept}
              helperText={errors.concept?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                select
                variant="filled"
                label="Category"
                defaultValue={1}
                {...register('category', {
                    required: 'the category is required',
                })}
                error={!!errors.category}
              >
                  <MenuItem value={1}>Gustitos</MenuItem>
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              type="number" 
              label="Amount" 
              variant="filled" 
              fullWidth
              {...register('amount', {
                required: 'The amount is required',
                min: {value: 0, message: 'The minimum value is 0'}
              })}
              error={!!errors.amount}
              helperText={errors.amount?.message}
            />
          </Grid>
          {
            drawerForm === 'create' 
            ? (
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <TextField
                    select
                    variant="filled"
                    label="Type"
                    defaultValue={'income'}
                    {...register('type', {
                        required: 'the type is required',
                    })}
                    error={!!errors.type}
                  >
                      <MenuItem value={'income'}>Income</MenuItem>
                      <MenuItem value={'expense'}>Expense</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>
            ) 
            : null
          }
          <Grid item xs={12} sm={6}>
            <TextField 
              type="date" 
              label="Date" 
              variant="filled" 
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...register('date', {
                required: 'The date is required',
              })}
              error={!!errors.date}
              helperText={errors.date?.message}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} mt={4}>
          <Grid item xs={6} sm={3} ml="auto">
            <Button onClick={handleCancel} color="primary" className="circular-btn" size="large" fullWidth>
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button type="submit" color="secondary" className="circular-btn" size="large" fullWidth>
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  )
}
