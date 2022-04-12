import { Box, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Typography } from "@mui/material"
import { ChevronRight, DeleteForever, Edit } from "@mui/icons-material"
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { format } from "../../utils/currency"
import { useContext } from "react";
import { UiContext } from "../../context/ui/UiContext";

export const EntryInfo = () => {

  const {setDrawerForm} = useContext(UiContext)

  const handleDeleteEntry = () => {
    
  }

  return (
    <Box mb={2} display="flex" flexDirection="column" className="fadeIn">
      <Box mx="auto" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <ArrowCircleUpIcon sx={{height: 65, width: 65, color: "green", mb: 1}} />
        <Typography variant="h5" fontWeight={500} color={'green'}>{format(240)}</Typography>
        <Typography variant="h5">{'Proteina Gym'}</Typography>
        <Typography mt={1} variant="h6" color="gray">{'Gustitos'}</Typography>
        <Typography variant="subtitle1" color="gray">{'19 January 2022'}</Typography>
      </Box>
      <List sx={{mt: 1}}>
        <ListItem sx={{mb: 1, border: 1, borderRadius: 5, borderColor: '#d9d9d9'}} button onClick={() => setDrawerForm('edit')}>
          <ListItemIcon>
            <Edit />
          </ListItemIcon>
          <ListItemText primary="Edit entry" />
          <ListItemSecondaryAction sx={{display: 'flex', justifyContent:'center'}}>
            <ChevronRight sx={{height: 35, width: 35}} />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem sx={{mb: 1, border: 1, borderRadius: 5, borderColor: '#d9d9d9'}} button onClick={handleDeleteEntry}>
          <ListItemIcon>
            <DeleteForever />
          </ListItemIcon>
          <ListItemText primary="Delete" />
          <ListItemSecondaryAction sx={{display: 'flex', justifyContent:'center'}}>
            <ChevronRight sx={{height: 35, width: 35}} />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Box>  
  )
}
