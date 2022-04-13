import { Refresh } from "@mui/icons-material"
import { Box, Grid, IconButton, Typography, List, ListItem } from "@mui/material"
import { useContext } from "react"
import { EntryContext } from "../../context/entry/EntryContext"
import { EntryCard } from "./EntryCard"
import AddCircle from '@mui/icons-material/AddCircle';

export const EntryList = ({entries}) => {

  const {refreshEntries} = useContext(EntryContext)

  const sorting = (a, b) => {
    if (a.date > b.date) {
      return -1;
    }

    if (a.date < b.date) {
      return 1;
    }

    return 0;
  }

  return (
    <Box mt={2} mb={10}>
      <Grid container spacing={1} flex flexDirection="column" >
        <Grid item display="flex" justifyContent="space-between" alignItems="end">
          <Typography variant="h6" fontWeight={'medium'} mb={1}>Last entries</Typography>
          <IconButton color="primary" onClick={refreshEntries}>
            <Refresh sx={{height: 30, width: 30}} />
          </IconButton>
        </Grid>
      {
          entries.length > 0
          ? (
            entries.sort((a,b) => sorting(a, b)).map(entry => (
                <EntryCard key={entry.id} entry={entry} />
            ))
          )
          : (
            <Grid mt={2} item display="flex" flexDirection="column" alignItems="center">
              <Typography mb={1} variant="body1" color="gray" maxWidth={300} textAlign="center">
                There are no entries registered.
              </Typography>
              <Typography mb={2} variant="body1" color="gray" maxWidth={300} textAlign="center">
                You can start adding new ones with the floating button.
              </Typography>
              <AddCircle sx={{mb: 1,height: 35, width: 35, color: "#afafaf"}} />
            </Grid>
          )
      }
      </Grid>
    </Box>
  )
}
