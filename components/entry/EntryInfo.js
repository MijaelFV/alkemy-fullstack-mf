import { Box, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Typography } from "@mui/material"
import { ArrowCircleDown, ChevronRight, DeleteForever, Edit } from "@mui/icons-material"
import ArrowCircleUp from '@mui/icons-material/ArrowCircleUp';
import { format } from "../../utils/currency"
import { useContext } from "react";
import { UiContext } from "../../context/ui/UiContext";
import { EntryContext } from "../../context/entry/EntryContext";

export const EntryInfo = () => {

  const {setDrawerForm, toggleDrawer} = useContext(UiContext)
  const {selected, deleteEntry} = useContext(EntryContext)

  const handleDeleteEntry = () => {
    toggleDrawer()
    deleteEntry()
  }

  return (
    <Box mb={2} display="flex" flexDirection="column" className="fadeIn">
      <Box mx="auto" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        {
          selected.type === "income" 
          ? <ArrowCircleUp sx={{height: 65, width: 65, color: "green", mb: 1}} />
          : <ArrowCircleDown sx={{height: 65, width: 65, color: "red", mb: 1}} />
        }
        <Typography variant="h5" fontWeight={500} color={selected.type === "income" ? 'green' : 'red'}>{format(selected.amount)}</Typography>
        <Typography variant="h5">{selected.concept}</Typography>
        <Typography mt={1} variant="h6" color="gray">{selected.Category.name}</Typography>
        <Typography variant="subtitle1" color="gray">{selected.date}</Typography>
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
