import { Category, Logout } from "@mui/icons-material";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { UiContext } from "../../context/ui/UiContext";

export const MainMenu = () => {

  const {isMenuOpen, toggleMenu, toggleDrawer, setDrawerForm} = useContext(UiContext)
  const {logout} = useContext(AuthContext)
  const open = Boolean(isMenuOpen);

  const handleCloseMenu = () => {
    toggleMenu(null)
  };

  const handleLogout = () => {
    handleCloseMenu()
    logout()
  }

  const handleCategoryMenu = () => {
    handleCloseMenu()
    setDrawerForm('category')
    toggleDrawer()
  }

  return (
    <Menu
      anchorEl={isMenuOpen}
      open={open}
      onClose={handleCloseMenu}
    >
      <MenuItem onClick={handleCategoryMenu}>
        <ListItemIcon>
          <Category />
        </ListItemIcon>
        <ListItemText>Manage categories</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout />
        </ListItemIcon>
        <ListItemText>Log out</ListItemText>
      </MenuItem>
    </Menu>
  )
}
