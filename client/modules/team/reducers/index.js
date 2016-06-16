import { combineReducers } from 'redux';

// import reducers
import list from './teamListReducers';
import single from './teamSingleReducers';

const postReducer = combineReducers({
  list
  , single
});

export default postReducer;
