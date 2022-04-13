import { useReducer } from 'react';
// import { entryTypes } from "./entryTypes";
import { EntryContext } from "./EntryContext";
import { entryReducer } from "./entryReducer";
// import financeApi from "../../api/financeApi";

const AUTH_INITIAL_STATE = {
    entries: [],
    balance: 0,
    selected: {
      concept: '',
      Category: '',
      amount: '',
      date: '',
      type: ''
    }
}

export const EntryProvider = ({children}) => {
    const [state, dispatch] = useReducer(entryReducer, AUTH_INITIAL_STATE)

   
    return (
    <EntryContext.Provider value={{
        ...state,
    }}>
        {children}
    </EntryContext.Provider>
    )
}