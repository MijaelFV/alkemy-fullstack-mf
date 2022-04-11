import AddIcon from '@mui/icons-material/Add';
import { Card, CardContent, Fab, Grid, Typography } from "@mui/material"
import { format } from "../utils/currency"
import { EntryList } from "../components/balance/EntryList"
import { MainLayout } from "../components/layouts/MainLayout";

export default function Home({entries}) {
  return (
    <MainLayout title='Balance'>
      <Grid container flex justifyContent={'center'}>
        <Grid item xs={11} sm={10} lg={6}>
          <Typography variant="h6" fontWeight={'medium'} mt={2} mb={2}>Hi, Mijael!</Typography>
          <Card sx={{bgcolor:"#fd751a", color:"white"}}>
            <CardContent sx={{display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
              <Typography variant="h6">Balance</Typography>
              <Typography variant="h3" className="fadeIn">{format(2560)}</Typography>
            </CardContent>
          </Card>
          <EntryList />
          <Fab sx={{position: 'fixed', bottom: 16, right: 16}} color="secondary">
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
    </MainLayout>
  )
}