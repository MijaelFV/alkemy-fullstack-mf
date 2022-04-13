import { useEffect, useReducer } from 'react';
import Swal from 'sweetalert2'
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

const defaultErrorRes = 'There was an error - try again';

export const EntryProvider = ({children}) => {
    const [state, dispatch] = useReducer(entryReducer, AUTH_INITIAL_STATE)

    useEffect(() => {
      refreshCategories()
    }, [])

    const loadCategories = (data) => {
      dispatch({type: entryTypes.entryCategoriesLoad, payload: data})
    }

    const refreshCategories = async() => {
      try {
        const {data} = await financeApi.get('/category')
        dispatch({type: entryTypes.entryCategoriesLoad, payload: data})
      } catch (error) {
        console.log(error);
      }
    }

    const createCategory = async(name) => {
      try {
        const {data: category} = await financeApi.post(`/category`, {name})
    
        const payload = [
          ...state.categories,
          {
            id: category.id,
            name: category.name
          }
        ]

        dispatch({type: entryTypes.entryCategoriesLoad, payload})

        return {
          hasError: false
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return {
            hasError: true,
            message: error.response?.data.msg || error.response?.data.errors[0].msg || defaultErrorRes
          }
        }

        return {
          hasError: true,
          message: 'The category could not be created - try again'
        }
      }
    }

    const updateCategory = async(id, name) => {
      try {
        const {data: category} = await financeApi.put(`/category/${id}`, {name})
    
        const payload = [
          ...state.categories.filter(c => c.id !== id),
          {
            id: category.id,
            name: category.name
          }
        ]

        dispatch({type: entryTypes.entryCategoriesLoad, payload})

        return {
          hasError: false
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return {
            hasError: true,
            message: error.response?.data.msg || error.response?.data.errors[0].msg || defaultErrorRes
          }
        }

        return {
          hasError: true,
          message: defaultErrorRes
        }
      }
    }

    const deleteCategory = async(id) => {

      const isConfirmed = await Swal.fire({
        text: "Are you sure you want to delete this category? This will delete all entries that use it",
        icon: 'warning',
        iconColor: "red",
        showCancelButton: true,
        confirmButtonText: "Delete",
        confirmButtonColor: "red",
        customClass: {
          container: 'swal2-container'
        }
      }).then((result) => {
        return result.isConfirmed
      })
      if (!isConfirmed) return {hasError: false};

      try {
        await financeApi.delete(`/category/${id}`)
    
        const payload = state.categories.filter(c => c.id !== id)
        dispatch({type: entryTypes.entryCategoriesLoad, payload})

        return {
          hasError: false
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return {
            hasError: true,
            message: error.response?.data.msg || error.response?.data.errors[0].msg || defaultErrorRes
          }
        }

        return {
          hasError: true,
          message: defaultErrorRes
        }
      }
    }
    

    const loadBalance = (data) => {
      dispatch({type: entryTypes.entryBalanceLoad, payload: data})
    }


    const loadEntries = (data) => {
      dispatch({type: entryTypes.entryLoad, payload: data})
    }

    const selectEntry = (data) => {
      dispatch({type: entryTypes.entrySelectedLoad, payload: data})
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
            message: error.response?.data.msg || error.response?.data.errors[0].msg || defaultErrorRes
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
            message: error.response?.data.msg || error.response?.data.errors[0].msg || defaultErrorRes
          }
        }

        return {
          hasError: true,
          message: defaultErrorRes
        }
      }
    }

    const deleteEntry = async() => {
      const isConfirmed = await Swal.fire({
        text: "Are you sure you want to delete this entry?",
        icon: 'warning',
        iconColor: "red",
        showCancelButton: true,
        confirmButtonText: "Delete",
        confirmButtonColor: "red",
        customClass: {
          container: 'swal2-container'
        }
      }).then((result) => {
        return result.isConfirmed
      })
      if (!isConfirmed) return {hasError: false};

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
        loadBalance,
        loadEntries,
        refreshEntries,
        selectEntry,
        createEntry,
        updateEntry,
        deleteEntry,
        loadCategories,
        refreshCategories,
        createCategory,
        updateCategory,
        deleteCategory
    }}>
        {children}
    </EntryContext.Provider>
    )
}