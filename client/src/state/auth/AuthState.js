import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import Context from './context';
import reducer from './reducer';
import { ERROR, LOAD, LOGOUT, SUCCESS } from './types';
import authToken from '../../resources/utils/authToken';

const AuthState = ({ children }) => {
  const initialState = {
    authenticated: false,
    errors: undefined,
    loading: true,
    user: undefined
  };

  const load = async () => {
    if (localStorage.getItem('auth-token')) {
      authToken(localStorage.getItem('auth-token'));
    }

    try {
      const { data } = await axios.get('/api/users');

      dispatch({
        payload: data,
        type: LOAD
      });
    } catch {
      dispatch({ type: ERROR });
    }
  }

  const login = async form => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const { data } = await axios.post('/api/users/login', form, config);

      dispatch({
        payload: data,
        type: SUCCESS
      });

      load();
    } catch (err) {
      dispatch({
        payload: err.response.data.errors.map(e => e.msg),
        type: ERROR
      });
    }
  }

  const logout = () => {
    dispatch({ type: LOGOUT });
  }

  const register = async form => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const { data } = await axios.post('/api/users/register', form, config);

      dispatch({
        payload: data,
        type: SUCCESS
      });

      load();
    } catch (err) {
      dispatch({
        payload: err.response.data.errors.map(e => e.msg),
        type: ERROR
      });
    }
  }

  const setError = error => {
    dispatch({
      payload: error,
      type: ERROR
    });
  }

  useEffect(() => {
    load();

    // eslint-disable-next-line
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);

  const context = {
    authenticated: state.authenticated,
    errors: state.errors,
    load,
    loading: state.loading,
    login,
    logout,
    register,
    setError,
    user: state.user
  };

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
}

export default AuthState;