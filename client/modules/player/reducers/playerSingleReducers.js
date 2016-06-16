/*****

SINGLE REDUCERS GO HERE


*****/


// import * as singleActions from '../actions/playerSingleActions';
import { singleActions } from '../actions';


function single(state = {
  isFetching: false
  , item: {}
  , populated: false
  , error: null
  , status: null //creating, editing
}, action) {
  switch(action.type) {
    case singleActions.REQUEST_SINGLE_PLAYER:
      return Object.assign({}, state, {
        isFetching: true
        // , item: {} // when transitioning within states where this is already populate -- i.e. from 'Single' to 'Update', this forces a refresh on the element, which isn't desirable.  Also, retrieve error is handled below, so this shouldn't be necessary even when calling new instances
        , status: null
      })
    case singleActions.RECEIVE_SINGLE_PLAYER:
      if(action.success) {
        return Object.assign({}, state, {
          isFetching: false
          , item: action.player
          , error: null
          , populated: false
          , lastUpdated: action.receivedAt
        })
      } else {
        return Object.assign({}, state, {
          isFetching: false
          , item: {}
          , error: action.error
          , populated: false
          , lastUpdated: action.receivedAt
        })
      }
      ///////
      case singleActions.REQUEST_SINGLE_PLAYER_BY_TEAM:
        return Object.assign({}, state, {
          isFetching: true
          // , item: {}
          , status: null
        })
      case singleActions.RECEIVE_SINGLE_PLAYER_BY_TEAM:
        if(action.success) {
          return Object.assign({}, state, {
            isFetching: false
            , item: action.player
            , populated: false
            , error: null
            , lastUpdated: action.receivedAt
          })
        }
      ///////
      case singleActions.SETUP_NEW_PLAYER:
        console.log("SETUP_NEW_PLAYER");
        return Object.assign({}, state, {
          isFetching: false
          , item: {
            firstname: ""
            , lastname: ""
            , playernumber: ""
            , team: action.team
          }
          , populated: false
        });
      case singleActions.REQUEST_CREATE_PLAYER:
        console.log("REQUEST_CREATE_PLAYER");
        console.log(action);
        return Object.assign({}, state, {
          isFetching: true
          , item: action.player
          , status: 'creating'
        })
        break;
      case singleActions.RECEIVE_CREATE_PLAYER:
        console.log("RECEIVE_CREATE_PLAYER");
        console.log(action);
        if(action.success) {
          return Object.assign({}, state, {
            isFetching: false
            , item: action.player
            , status: null
            , populated: false
            , error: null
          })
        } else {
          return Object.assign({}, state, {
            isFetching: false
            , item: {}
            , status: null
            , populated: false
            , error: action.error
          })
        }
      case singleActions.REQUEST_UPDATE_PLAYER:
        return Object.assign({}, state, {
          isFetching: true
          , item: action.player
          , status: 'updating'
        })
      case singleActions.RECEIVE_UPDATE_PLAYER:
        if(action.success) {
          return Object.assign({}, state, {
            isFetching: false
            , item: action.player
            , status: null
            , populated: false
            , error: null
          })
        } else {
          return Object.assign({}, state, {
            isFetching: false
            , item: {}
            , status: null
            , populated: false
            , error: action.error
          })
        }
      default:
        return state
    }
  }

  export default single;
