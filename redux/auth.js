import api from '../utils/api';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const USER_LOADED = 'USER_LOADED';
const AUTH_ERROR = 'AUTH_ERROR';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';
const ACCOUNT_DELETED = 'ACCOUNT_DELETED';
const ADD_TOKEN = 'ADD_TOKEN';

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/users', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const body = { email, password };
  try {
    const res = await api.post('/api/auth', body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    console.log(`res`, res);
    dispatch(loadUser());
  } catch (err) {
    console.log(`err###`, err);
  }
};

// Logout
export const logout = () => ({ type: LOGOUT });

const initialState = {
  token: null,
  isAuthenticated: true,
  loading: true,
  user: null,
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_TOKEN:
      return {
        ...state,
        token: localStorage.getItem('token'),
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload.user,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case ACCOUNT_DELETED:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
}

export default authReducer;
