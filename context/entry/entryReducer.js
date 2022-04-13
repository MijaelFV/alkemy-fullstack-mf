
import { entryTypes } from "./entryTypes";

export const entryReducer = (state, action) => {
    switch (action.type) {
        case entryTypes.entryLoad:
                return {
                    ...state,
                    entries: action.payload
                }

        case entryTypes.entrySelected:
                return {
                    ...state,
                    selected: action.payload,
                }

        case entryTypes.entryBalanceLoad:
                return {
                    ...state,
                    balance: action.payload,
                }

        default:
            return state;
    }
}