import { Refresh } from "@mui/icons-material"
import { Box, Grid, IconButton, Typography } from "@mui/material"
import { useContext } from "react"
import { EntryContext } from "../../context/entry/EntryContext"
import { EntryCard } from "./EntryCard"

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
          entries.sort((a,b) => sorting(a, b)).map(entry => (
              <EntryCard key={entry.id} entry={entry} />
          ))
      }
      </Grid>
    </Box>
  )
}
