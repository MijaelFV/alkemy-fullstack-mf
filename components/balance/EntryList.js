import { Box, Grid, Typography } from "@mui/material"
import { EntryCard } from "./EntryCard"

export const EntryList = ({entries}) => {

  return (
    <Box mt={2} mb={10}>
      <Typography variant="h6" fontWeight={'medium'} mb={1}>Entries</Typography>
      <Grid container spacing={1} flex flexDirection="column" >
      {
          entries.map(entry => (
              <EntryCard key={entry.concept} entry={entry} />
          ))
      }
      </Grid>
    </Box>
  )
}
