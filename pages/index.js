import AddIcon from '@mui/icons-material/Add';
import { Box, IconButton, Card, CardContent, Fab, Grid, Typography, MenuItem, ListItemIcon, MenuList, ListItemText } from "@mui/material"
import { format } from "../utils/currency"
import { EntryList } from "../components/balance/EntryList"
import { MainLayout } from "../components/layouts/MainLayout";
import { Bottombar } from "../components/ui/Bottombar";
import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from "react";
import { MainMenu } from "../components/ui/MainMenu";
import { UiContext } from "../context/ui/UiContext";

export default function HomePage({entries}) {

  const {toggleDrawer, setDrawerForm, toggleMenu} = useContext(UiContext)

  const handleOpenCreateEntry = () => {
    setDrawerForm('create')
    toggleDrawer()
  }

  const handleOpenMenu = (event) => {
    toggleMenu(event.currentTarget)
  }

  return (
    <MainLayout title='Balance'>
      <Grid container flex justifyContent={'center'}>
        <Grid item xs={11} sm={10} lg={6}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight={'medium'} mt={2} mb={2}>Hi, Mijael!</Typography>
            <IconButton
              variant="contained"
              color="primary"
              onClick={handleOpenMenu}
            >
              <MenuIcon sx={{width: 30, height: 30}} />
            </IconButton>
            <MainMenu />
          </Box>
          <Card sx={{bgcolor:"#fd751a", color:"white"}}>
            <CardContent sx={{display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
              <Typography variant="h6">Balance</Typography>
              <Typography variant="h3" className="fadeIn">{format(2560)}</Typography>
            </CardContent>
          </Card>
          <EntryList />
          <Fab onClick={handleOpenCreateEntry} sx={{position: 'fixed', bottom: 16, right: 16}} color="secondary">
            <AddIcon />
          </Fab>
          <Bottombar />
        </Grid>
      </Grid>
    </MainLayout>
  )
}