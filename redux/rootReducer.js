import { combineReducers } from 'redux';

import auth from './auth';
import toolReducer from './tool';

export default combineReducers({
  auth,
  toolReducer,
});
