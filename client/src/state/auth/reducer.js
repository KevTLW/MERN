import { ERROR, LOAD, LOGOUT, SUCCESS } from './types';

const initialState = {
  authenticated: false,
  errors: undefined,
  loading: true,
  user: undefined
};

export default (state = initialState, { payload, type }) => {
  switch (type) {
    case ERROR:
    case LOGOUT:
      localStorage.removeItem('auth-token');
      return {
        ...state,
        authenticated: false,
        errors: payload,
        loading: false,
        user: undefined
      };
    case LOAD:
      return {
        ...state,
        authenticated: true,
        errors: undefined,
        loading: false,
        user: payload
      };
    case SUCCESS:
      localStorage.setItem('auth-token', payload.token);
      return {
        ...state,
        authenticated: true,
        errors: undefined,
        loading: false
      };
    default:
      return state;
  }
}