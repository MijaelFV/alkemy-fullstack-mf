
import { authTypes } from "./authTypes";

export const authReducer = (state, action) => {
    switch (action.type) {
        case authTypes.authLogin:
                return {
                    ...state,
                    isLoggedIn: true,
                    user: action.payload
                }

        case authTypes.authLogout:
                return {
                    ...state,
                    isLoggedIn: false,
                    user: undefined,
                }

        default:
            return state;
    }
}