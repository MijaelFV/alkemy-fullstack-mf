import { useReducer } from 'react';
import { entryTypes } from "./entryTypes";
import { EntryContext } from "./EntryContext";
import { entryReducer } from "./entryReducer";
import financeApi from "../../api/financeApi";

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

    const loadEntries = (data) => {
      dispatch({type: entryTypes.entryLoad, payload: data})
    }

    const loadBalance = (data) => {
      dispatch({type: entryTypes.entryBalanceLoad, payload: data})
    }

    const selectEntry = (data) => {
      dispatch({type: entryTypes.entrySelected, payload: data})
    }

    const refreshEntries = async() => {
      try {
        const {data} = await financeApi.get('/entry')
        dispatch({type: entryTypes.entryLoad, payload: data.entries})
        dispatch({type: entryTypes.entryBalanceLoad, payload: data.balance})
      } catch (error) {
        console.log(error);
      }
    }

    const deleteEntry = async() => {
      try {
        await financeApi.delete(`/entry/${state.selected.id}`, {withCredentials: true})
        const payload = state.entries.filter(e => e.id !== state.selected.id)
      
        dispatch({type: entryTypes.entryLoad, payload})
        if (state.selected.type === "income") {
          dispatch({type: entryTypes.entryBalanceLoad, payload: state.balance - state.selected.amount})  
        } else {
          dispatch({type: entryTypes.entryBalanceLoad, payload: state.balance + state.selected.amount})  
        }
      } catch (error) {
        console.log(error);
      }
    }

    return (
    <EntryContext.Provider value={{
        ...state,
        selectEntry,
        loadEntries,
        loadBalance,
        deleteEntry,
        refreshEntries
    }}>
        {children}
    </EntryContext.Provider>
    )
}