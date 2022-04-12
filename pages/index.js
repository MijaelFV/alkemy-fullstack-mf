import AddIcon from '@mui/icons-material/Add';
import { Box, IconButton, Card, CardContent, Fab, Grid, Typography, MenuItem, ListItemIcon, MenuList, ListItemText } from "@mui/material"
import { format } from "../utils/currency"
import { EntryList } from "../components/balance/EntryList"
import { MainLayout } from "../components/layouts/MainLayout";
import { Bottombar } from "../components/ui/Bottombar";
import MenuIcon from '@mui/icons-material/Menu';
import { useContext, useEffect } from "react";
import { MainMenu } from "../components/ui/MainMenu";
import { UiContext } from "../context/ui/UiContext";
import financeApi from "../api/financeApi";
import { AuthContext } from "../context/auth/AuthContext";

export default function HomePage({entries = [], balance = 0}) {

  const {toggleDrawer, setDrawerForm, toggleMenu} = useContext(UiContext)
  const {user = ''} = useContext(AuthContext)

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
            <Typography variant="h6" fontWeight={'medium'} mt={2} mb={2}>Hi, {user.slice(0, 1).toUpperCase()}{user.slice(1)}!</Typography>
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
              <Typography variant="h3" className="fadeIn">{format(balance)}</Typography>
            </CardContent>
          </Card>
          <EntryList entries={entries} />
          <Fab onClick={handleOpenCreateEntry} sx={{position: 'fixed', bottom: 16, right: 16}} color="secondary">
            <AddIcon />
          </Fab>
          <Bottombar />
        </Grid>
      </Grid>
    </MainLayout>
  )
}

export const getServerSideProps = async ({req}) => {
  const {token = ''} = req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      }
    }
  }

  const {data} = await financeApi.get('/entry', {
    headers: {
      Cookie: `token=${token};`
    }
  })

  return {
    props: {
      entries: data.entries,
      balance: data.balance
    }
  }
}