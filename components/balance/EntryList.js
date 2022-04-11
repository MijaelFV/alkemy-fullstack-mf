import { Box, Grid, Typography } from "@mui/material"
import { EntryCard } from "./EntryCard"

export const EntryList = () => {

  const entries = [
    {
      concept: 'Reparacion',
      category: 'Vehiculo',
      date: '31 Jan, 11:00am',
      type: 'expense',
      amount: 21000
    },
    {
      concept: 'Chocolate Suizo',
      category: 'Gustitos',
      date: '19 Jan, 04:25pm',
      type: 'expense',
      amount: 300
    },
    {
      concept: 'Devolucion IVA',
      category: 'Reintegros',
      date: '19 Jan, 04:25pm',
      type: 'income',
      amount: 745
    },
    {
      concept: 'Reparacion',
      category: 'Vehiculo',
      date: '31 Jan, 11:00am',
      type: 'expense',
      amount: 21000
    },
    {
      concept: 'Devolucion IVA',
      category: 'Reintegros',
      date: '19 Jan, 04:25pm',
      type: 'income',
      amount: 745
    },
    {
      concept: 'Chocolate Suizo',
      category: 'Gustitos',
      date: '19 Jan, 04:25pm',
      type: 'expense',
      amount: 300
    },
    {
      concept: 'Chocolate Suizo',
      category: 'Gustitos',
      date: '19 Jan, 04:25pm',
      type: 'expense',
      amount: 300
    },
    {
      concept: 'Devolucion IVA',
      category: 'Reintegros',
      date: '19 Jan, 04:25pm',
      type: 'income',
      amount: 745
    },
    {
      concept: 'Reparacion',
      category: 'Vehiculo',
      date: '31 Jan, 11:00am',
      type: 'expense',
      amount: 21000
    },
    {
      concept: 'Devolucion IVA',
      category: 'Reintegros',
      date: '19 Jan, 04:25pm',
      type: 'income',
      amount: 745
    }
  ]

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
