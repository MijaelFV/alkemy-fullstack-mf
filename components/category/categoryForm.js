import { DeleteForever, Edit, ErrorOutline } from "@mui/icons-material";
import { Box, Button, Chip, Divider, FormControl, Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, MenuItem, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UiContext } from "../../context/ui/UiContext";

export const CategoryForm = () => {

  const { reset, register, handleSubmit, formState: { errors } } = useForm();

  const {toggleDrawer} = useContext(UiContext)

  const handleAccept = () => {
    toggleDrawer()
    setDrawerForm('none')
    reset()
  }

  const onCreate = async({name}) => {
    
  }

  const onDelete = async({name}) => {
    
  }

  const onEdit = async({name}) => {
    
  }

  const categories = ['1', '2', '3', '4', '5', '6']

  return (
    <form onSubmit={handleSubmit(onCreate)}>
      <Box className="fadeIn" sx={{mx:"5px", my: "20px"}}>
        <Grid container spacing={3}>
          <Grid item xs={12} gap="10px" display="flex" alignItems="center">
            <Typography variant="h5">Manage categories</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              label="New category" 
              variant="filled" 
              fullWidth
              {
                ...register('name', {
                  required: 'The name is required',
                  minLength: {value: 2, message: 'Minimum 2 characters'}
                })
              }
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>
          <Grid item xs={12} display="flex" alignItems="center">
            <Button onClick={onCreate} color="primary" className="circular-btn" size="large" fullWidth>
              Add
            </Button>
          </Grid>
          <Grid item xs={12} mb={2}>
            <Box border={3} borderRadius={2} overflow={'auto'} height="260px">
              <List>
                {
                  categories.map((cat) => {
                    return <>
                      <ListItem key={cat} button>
                        {
                          false
                          ? (
                            <TextField
                              type="text"
                              size="small"
                              label="Category name" 
                              variant="filled" 
                            />
                          )
                          : <ListItemText primary="Example category" />
                        }
                        
                        <ListItemSecondaryAction sx={{display: 'flex', justifyContent:'center'}}>
                          <IconButton color="primary">
                            <Edit sx={{height: 30, width: 30}} />
                          </IconButton>
                          <IconButton color="error">
                            <DeleteForever sx={{height: 30, width: 30}} />
                          </IconButton>
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
    </form>
  )
}
