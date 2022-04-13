import { Box, Button, FormControl, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { EntryContext } from "../../context/entry/EntryContext";
import { UiContext } from "../../context/ui/UiContext";
import ErrorSign from "../ui/ErrorSign";

export const EntryForm = () => {
  const {setDrawerForm, drawerForm, toggleDrawer} = useContext(UiContext)
  const {selected, categories, createEntry, updateEntry, selectEntry} = useContext(EntryContext)
  
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { reset, register, handleSubmit, formState: { errors } } = useForm({
    concept: '',
    category: '',
    amount: '',
    type: '',
    date: '',
  });

  useEffect(() => {
    if (drawerForm === 'edit') {
      reset({
        concept: selected?.concept,
        category: selected?.category?.id,
        amount: selected?.amount,
        type: selected?.type,
        date: selected?.date,
      })
    }
  }, [selected, drawerForm, reset])
  

  const handleCancel = () => {
    if (drawerForm === "create") {
      toggleDrawer()
    }
    
    setDrawerForm('none')
    reset()
  }

  const onCreateEntry = async({concept, category, amount, type, date}) => {
    setShowError(false);
    const {hasError, message} = await createEntry({concept, category, amount, type, date})

    if (hasError) {
      setShowError(true);
      setErrorMessage(message)
      return;
    } 
    
    toggleDrawer()
    setDrawerForm('none')
    reset()
  }

  const onEditEntry = async({concept, category, amount, date}) => {
    setShowError(false);
    const {hasError, message} = await updateEntry({id: selected.id, concept, category, amount, date, lastAmount: selected.amount})

    if (hasError) {
      setShowError(true);
      setErrorMessage(message)
      return;
    } 

    toggleDrawer()
    selectEntry(null)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(drawerForm === "create" ? onCreateEntry : onEditEntry)}>
      <Box className="fadeIn" sx={{mx:"5px", my: "20px"}}>
        <Grid container spacing={3}>
          <Grid item xs={12} gap="10px" display="flex" alignItems="center">
            <Typography variant="h5">{drawerForm === 'edit' ? 'Edit entry' : 'Create entry'}</Typography>
            <ErrorSign showError={showError} errorMessage={errorMessage} />
          </Grid>
          <Grid item xs={12} sm={drawerForm === 'create' ? 12 : 6}>
            <TextField
              type="text"
              label="Concept" 
              variant="filled" 
              InputLabelProps={{ shrink: true }}
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
                defaultValue={categories[0]?.id}
                {...register('category', {
                    required: 'the category is required',
                })}
                error={!!errors.category}
              >
                {
                  categories.map(c => (
                    <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                  ))
                }
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              type="number" 
              label="Amount" 
              variant="filled" 
              fullWidth
              InputLabelProps={{ shrink: true }}
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
              {
                drawerForm === "create"
                ? 'Create'
                : 'Save'
              }
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  )
}
