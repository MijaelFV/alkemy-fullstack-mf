import { uiTypes } from "./uiTypes";

export const uiReducer = (state, action) => {
    switch (action.type) {
        case uiTypes.uiToggleDrawer:
                return {
                    ...state,
                    isDrawerOpen: !state.isDrawerOpen
                }

        case uiTypes.uiSetDrawerForm:
                return {
                    ...state,
                    drawerForm: action.payload
                }

        case uiTypes.uiToggleMenu:
                return {
                    ...state,
                    isMenuOpen: action.payload
                }

        default:
            return state;
    }
}