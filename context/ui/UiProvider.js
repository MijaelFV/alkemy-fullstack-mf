import { useReducer } from 'react';
import { uiReducer } from './uiReducer';
import { UiContext } from './UiContext';
import { uiTypes } from "./uiTypes";

const UI_INITIAL_STATE = {
  // isDrawerOpen: false
}

export const UiProvider = ({children}) => {
    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    // const toggleDrawer = () => {
    //   dispatch({type: uiTypes.uiToggleDrawer})
    // }

    return (
      <UiContext.Provider value={{
          ...state,
          // toggleDrawer
      }}>
          {children}
      </UiContext.Provider>
    )
}