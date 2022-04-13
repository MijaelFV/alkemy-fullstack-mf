import axios from 'axios';
import { useReducer, useEffect } from 'react';
import { useRouter } from 'next/router';
import { authTypes } from "./authTypes";
import { authReducer } from "./authReducer";
import { AuthContext } from "./AuthContext";
import financeApi from "../../api/financeApi";
import Cookies from 'js-cookie';

const AUTH_INITIAL_STATE = {
    isLoggedIn: false,
    user: undefined,
}

export const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)
    const router = useRouter();
  
    useEffect(() => {
      checkToken();
    }, [])

    const checkToken = async() => {
      if (!Cookies.get('token')) return ;

      try {
        const {data} = await financeApi.get('/auth/renew');
        const {token, name} = data;
        Cookies.set('token', token);
        dispatch({type: authTypes.authLogin, payload: name});
      } catch (error) {
        console.log(error);
        Cookies.remove('token')
      }
    }

    const loginUser = async(email, password) => {
      try {
        const {data} = await financeApi.post('/auth/login', {email, password}, {withCredentials: false});
        const {token, name} = data;
        Cookies.set('token', token);

        dispatch({type: authTypes.authLogin, payload: name});
        router.replace('/');
        return true;
      } catch (error) {
        console.log(error.response);
        if (axios.isAxiosError(error)) {
          return {
            hasError: true,
            message: error.response?.data.msg || error.response?.data.errors[0].msg
          }
        }

        return {
          hasError: true,
          message: 'There was an error - try again'
        }
      }
    }

    const registerUser = async(name, email, password, password2) => {
      try {
        const {data} = await financeApi.post('/user', {name, email, password, password2}, {withCredentials: false});
        const {token, user} = data;
        Cookies.set('token', token);

        dispatch({type: authTypes.authLogin, payload: user.name});
        router.replace('/');
        return {
          hasError: false
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return {
            hasError: true,
            message: error.response?.data.msg || error.response?.data.errors[0].msg
          }
        }

        return {
          hasError: true,
          message: 'The user could not be created - try again'
        }
      }
    }

    const logout = () => {
      Cookies.remove('token');
      router.reload();
    }

    return (
    <AuthContext.Provider value={{
        ...state,
        loginUser,
        registerUser,
        logout
    }}>
        {children}
    </AuthContext.Provider>
    )
}