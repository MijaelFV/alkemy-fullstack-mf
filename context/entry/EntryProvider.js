import { useEffect, useReducer } from 'react';
import { entryTypes } from "./entryTypes";
import { EntryContext } from "./EntryContext";
import { entryReducer } from "./entryReducer";
import financeApi from "../../api/financeApi";
import axios from "axios";

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

    useEffect(() => {
      refreshCategories()
    }, [])
    

    const loadEntries = (data) => {
      dispatch({type: entryTypes.entryLoad, payload: data})
    }

    const loadBalance = (data) => {
      dispatch({type: entryTypes.entryBalanceLoad, payload: data})
    }

    const selectEntry = (data) => {
      dispatch({type: entryTypes.entrySelectedLoad, payload: data})
    }

    const refreshCategories = async() => {
      try {
        const {data} = await financeApi.get('/category')
        dispatch({type: entryTypes.entryCategoriesLoad, payload: data})
      } catch (error) {
        console.log(error);
      }
    }

    const loadCategories = (data) => {
      dispatch({type: entryTypes.entryCategoriesLoad, payload: data})
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

    const createEntry = async(data) => {
      try {
        const {data: entry} = await financeApi.post(`/entry`, data)
      
        const payload = [
          ...state.entries,
          {
            id: entry.id,
            concept: entry.concept,
            amount: entry.amount,
            type: entry.type,
            date: entry.date,
            Category: {
              id: data.category,
              name: state.categories.find(e => e.id == data.category).name
            }
          }
        ]

        dispatch({type: entryTypes.entryLoad, payload})
        if (entry.type === "income") {
          dispatch({type: entryTypes.entryBalanceLoad, payload: Number(state.balance) + Number(entry.amount)})  
        } else {
          dispatch({type: entryTypes.entryBalanceLoad, payload: Number(state.balance) - Number(entry.amount)})  
        }

        return {
          hasError: false
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return {
            hasError: true,
            message: error.response?.data.msg
          }
        }

        return {
          hasError: true,
          message: 'The entry could not be created - try again'
        }
      }
    }

    const updateEntry = async(data) => {
      try {
        const { data: entry } = await financeApi.put(`/entry/${data.id}`, {concept: data.concept, category: data.category, amount: data.amount, date: data.date})

        const payload = [
          ...state.entries.filter(e => e.id !== data.id),
          {
            id: entry.id,
            concept: entry.concept,
            amount: entry.amount,
            type: entry.type,
            date: entry.date,
            Category: {
              id: data.category,
              name: state.categories.find(e => e.id == data.category).name
            }
          }
        ]

        dispatch({type: entryTypes.entryLoad, payload})
        if (entry.type === "income") {
          dispatch({type: entryTypes.entryBalanceLoad, payload: (Number(state.balance) - Number(data.lastAmount)) + Number(entry.amount)})  
        } else {
          dispatch({type: entryTypes.entryBalanceLoad, payload: (Number(state.balance) + Number(data.lastAmount)) - Number(entry.amount)})  
        }

        return {
          hasError: false
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return {
            hasError: true,
            message: error.response?.data.msg
          }
        }

        return {
          hasError: true,
          message: 'There was an error - try again'
        }
      }
    }

    const deleteEntry = async() => {
      try {
        await financeApi.delete(`/entry/${state.selected.id}`, {withCredentials: true})
        const payload = state.entries.filter(e => e.id !== state.selected.id)
      
        dispatch({type: entryTypes.entryLoad, payload})
        if (state.selected.type === "income") {
          dispatch({type: entryTypes.entryBalanceLoad, payload: Number(state.balance) - Number(state.selected.amount)})  
        } else {
          dispatch({type: entryTypes.entryBalanceLoad, payload: Number(state.balance) + Number(state.selected.amount)})  
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
        refreshEntries,
        loadCategories,
        updateEntry,
        createEntry
    }}>
        {children}
    </EntryContext.Provider>
    )
}