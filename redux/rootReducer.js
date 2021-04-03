import { combineReducers } from 'redux';

import auth from './auth';
import toolReducer from './toolReducer';

export default combineReducers({
  auth,
  toolReducer,
});
