import { combineReducers } from 'redux';

import auth from './auth';
import toolReducer from './toolReducer';
import snackbarReducer from './snackbarReducer';
import containerAdmin from './containerAdmin';
import receivingReducer from './receivingReducer';

export default combineReducers({
  auth,
  toolReducer,
  snackbarReducer,
  containerAdmin,
  receivingReducer,
});
