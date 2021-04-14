import { combineReducers } from 'redux';

import auth from './auth';
import toolReducer from './toolReducer';
import snackbarReducer from './snackbarReducer';
import containerAdmin from './containerAdmin';

export default combineReducers({
  auth,
  toolReducer,
  snackbarReducer,
  containerAdmin,
});
