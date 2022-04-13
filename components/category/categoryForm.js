import { Check, Close, DeleteForever, Edit, EditOff, ErrorOutline, Refresh } from "@mui/icons-material";
import { Box, Button, Chip, Divider, FormControl, Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, MenuItem, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { EntryContext } from "../../context/entry/EntryContext";
import { UiContext } from "../../context/ui/UiContext";

export const CategoryForm = () => {

  const { reset, register, handleSubmit, getValues, formState: { errors } } = useForm();

  const [editMode, setEditMode] = useState(null)
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {toggleDrawer} = useContext(UiContext)
  const {categories, createCategory, updateCategory, deleteCategory, refreshCategories} = useContext(EntryContext)

  const handleAccept = () => {
    toggleDrawer()
    setDrawerForm('none')
    reset()
  }

  const handleCreateCategory = async() => {
    setShowError(false);
    const {hasError, message} = await createCategory(getValues('newCategory'))

    if (hasError) {
      setShowError(true);
      setErrorMessage(message)
      return;
    } 

    reset({
      newCategory: '',
      newName: getValues('newName'),
    })
  }

  const handleDeleteCategory = async(id) => {
    setShowError(false);
    const {hasError, message} = await deleteCategory(id)

    if (hasError) {
      setShowError(true);
      setErrorMessage(message)
      return;
    } 
  }

  const handleEditEntry = async(id) => {
    setShowError(false);
    const {hasError, message} = await updateCategory(id, getValues('newName'))

    if (hasError) {
      setShowError(true);
      setErrorMessage(message)
      return;
    } 

    setEditMode(null)
  }

  const handleEditMode = (id, name) => {
    if (editMode === id || null === id ) {
      reset({
        newCategory: getValues('newCategory'),
        newName: ''
      })
      return setEditMode(null);
    }

    reset({
      newCategory: getValues('newCategory'),
      newName: name
    })
    setEditMode(id)
  }


  return (
    <Box className="fadeIn" sx={{mx:"5px", my: "20px"}}>
      <Grid container spacing={3}>
        <Grid item xs={12} gap="10px" display="flex" flexDirection="column" alignItems="start">
          <Typography variant="h5">Manage categories</Typography>
          <Box className="fadeIn" display={showError ? "flex" : "none"} mt={1} gap={1} alignItems="center" padding={1} borderRadius={4} bgcolor="red" color="white">
            <ErrorOutline />
            <Typography fontWeight={500} >{errorMessage}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="text"
            label="New category" 
            variant="filled" 
            fullWidth
            {
              ...register('newCategory', {
                required: 'The name is required',
                minLength: {value: 2, message: 'Minimum 2 characters'}
              })
            }
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Grid>
        <Grid item xs={12} display="flex" alignItems="center">
          <Button onClick={handleCreateCategory} color="primary" className="circular-btn" size="large" fullWidth>
            Add
          </Button>
        </Grid>
        <Grid item xs={12} mb={2} mt={-1} display="flex" flexDirection="column">
          <IconButton sx={{ml: 'auto', mb: 0.5}} color="primary" onClick={refreshCategories}>
            <Refresh sx={{height: 30, width: 30}} />
          </IconButton>
          <Box border={3} borderColor="#e5e5e5" borderRadius={2} overflow={'auto'} height="260px">
            <List>
              {
                categories.map((c) => {
                  return <>
                    <ListItem key={c.id + c.name} button>
                      {
                        editMode === c.id
                        ? (
                          <TextField
                            type="text"
                            size="small"
                            label="New name"
                            autoFocus
                            onKeyUp={(e) => e.key === "Enter" && handleEditEntry(c.id)}
                            {
                              ...register('newName', {
                              })
                            }
                            variant="outlined" 
                          />
                        )
                        : <ListItemText primary={c.name} />
                      }
                      <ListItemSecondaryAction sx={{display: 'flex', justifyContent:'center'}}>
                        {
                          editMode === c.id
                          ? (
                            <>
                              <IconButton onClick={() => handleEditEntry(c.id)} color="success">
                                <Check sx={{height: 30, width: 30}} />
                              </IconButton>
                              <IconButton onClick={() => handleEditMode(null)} color="primary">
                                <Close sx={{height: 30, width: 30}} />
                              </IconButton>
                            </>
                          )
                          : (
                            <>
                              <IconButton onClick={() => handleEditMode(c.id, c.name)} color="primary">
                                <Edit sx={{height: 30, width: 30}} />
                              </IconButton>
                              <IconButton onClick={() => handleDeleteCategory(c.id)} color="error">
                                <DeleteForever sx={{height: 30, width: 30}} />
                              </IconButton>
                            </>
                          )
                        }
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </>
                })
              }
            </List>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={3} mt={4}>
        <Grid item xs={6} sm={3} ml="auto">
          <Button onClick={handleAccept} color="primary" className="circular-btn" size="large" fullWidth>
            Accept
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
