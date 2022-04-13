import AddIcon from '@mui/icons-material/Add';
import { Box, IconButton, Card, CardContent, Fab, Grid, Typography} from "@mui/material"
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
import { EntryContext } from "../context/entry/EntryContext";

export default function HomePage(data) {

  const {toggleDrawer, setDrawerForm, toggleMenu} = useContext(UiContext)
  const {user = ''} = useContext(AuthContext)
  const {entries, balance, loadEntries, loadBalance} = useContext(EntryContext)

  const handleOpenCreateEntry = () => {
    setDrawerForm('create')
    toggleDrawer()
  }

  const handleOpenMenu = (event) => {
    toggleMenu(event.currentTarget)
  }

  useEffect(() => {
    loadEntries(data.entries)  
    loadBalance(data.balance)
  }, [data, loadBalance, loadEntries])
  

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
          <Card sx={{background:"linear-gradient(180deg, rgba(253,117,26,1) 31%, rgba(233,95,0,1) 100%)", color:"white"}}>
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

  try {
    const {data} = await financeApi.get('/entry', {
      headers: {
        Cookie: `token=${token};`
      }
    })
    return {
      props: {
        entries: data.entries || 0,
        balance: data.balance || 0
      }
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      }
    }
  }

}