import axios from 'axios';
import authToken from '../../resources/utils/authToken';
import { ERROR, LOAD, LOGOUT, SUCCESS } from './types';

export const load = () => async dispatch => {
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

export const login = form => async dispatch => {
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

    dispatch(load());
  } catch (err) {
    dispatch({
      payload: err.response.data.errors.map(e => e.msg),
      type: ERROR
    });
  }
}

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
}

export const register = form => async dispatch => {
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

    dispatch(load());
  } catch (err) {
    dispatch({
      payload: err.response.data.errors.map(e => e.msg),
      type: ERROR
    });
  }
}

export const setError = error => dispatch => {
  dispatch({
    payload: error,
    type: ERROR
  });
}