import { useReducer } from 'react';
import { uiReducer } from './uiReducer';
import { UiContext } from './UiContext';
import { uiTypes } from "./uiTypes";

const UI_INITIAL_STATE = {
  isDrawerOpen: false,
  isMenuOpen: false,
  drawerForm: 'none'
}

export const UiProvider = ({children}) => {
    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    const toggleDrawer = () => {
      dispatch({type: uiTypes.uiToggleDrawer})
    }

    const setDrawerForm = (value) => {
      dispatch({type: uiTypes.uiSetDrawerForm, payload: value})
    }
    
    const toggleMenu = (target) => {
      dispatch({type: uiTypes.uiToggleMenu, payload: target})
    }

    return (
      <UiContext.Provider value={{
          ...state,
          toggleDrawer,
          toggleMenu,
          setDrawerForm
      }}>
          {children}
      </UiContext.Provider>
    )
}