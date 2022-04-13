
import { entryTypes } from "./entryTypes";

export const entryReducer = (state, action) => {
    switch (action.type) {
        case entryTypes.entryLoad:
                return {
                    ...state,
                    entries: action.payload
                }

        case entryTypes.entrySelectedLoad:
                return {
                    ...state,
                    selected: action.payload,
                }

        case entryTypes.entryBalanceLoad:
                return {
                    ...state,
                    balance: action.payload,
                }

        case entryTypes.entryCategoriesLoad:
                return {
                    ...state,
                    categories: action.payload,
                }

        default:
            return state;
    }
}