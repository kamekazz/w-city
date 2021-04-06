import { combineReducers } from 'redux';

import auth from './auth';
import toolReducer from './toolReducer';
import snackbarReducer from './snackbarReducer';

export default combineReducers({
  auth,
  toolReducer,
  snackbarReducer,
});
