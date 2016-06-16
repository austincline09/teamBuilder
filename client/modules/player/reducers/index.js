import { combineReducers } from 'redux';

// import reducers
import list from './playerListReducers';
import single from './playerSingleReducers';

const postReducer = combineReducers({
  list
  , single
});

export default postReducer;
