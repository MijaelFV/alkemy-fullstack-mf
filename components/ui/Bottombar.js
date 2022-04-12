import { Drawer, IconButton } from "@mui/material"
import { useContext, useState } from "react"
import { EntryForm } from "../entry/EntryForm";
import { UiContext } from "../../context/ui/UiContext";
import { EntryInfo } from "../entry/EntryInfo";
import { Close } from "@mui/icons-material";
import { CategoryForm } from "../category/categoryForm";

export const Bottombar = () => {
  const {isDrawerOpen, drawerForm, toggleDrawer, setDrawerForm} = useContext(UiContext)

  const handleClose = () => {
    toggleDrawer()
    setDrawerForm('none')
  }

  return (
    <Drawer
      anchor="bottom"
      open={isDrawerOpen}
      PaperProps={{
        sx:{
          borderTopLeftRadius: '20px', 
          borderTopRightRadius: '20px',
          marginX: 'auto',
          px: 2,
          py: 2,
          width: {xs: '100%', sm: '80%', lg: '50%'}
        }
      }}
      onClose={handleClose}
    >
      <IconButton onClick={handleClose} sx={{mr: 'auto'}}>
        <Close sx={{height: 30, width: 30}} />
      </IconButton>
      {
        // drawerForm === "category"
        // ? <CategoryForm />
        // : (
          drawerForm !== "none"
          ? <EntryForm />
          : <EntryInfo />  
        // )
      }
    </Drawer>
  )
}
