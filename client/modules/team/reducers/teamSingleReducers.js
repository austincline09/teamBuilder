/*****

SINGLE REDUCERS GO HERE


*****/


// import * as singleActions from '../actions/teamSingleActions';
import { singleActions } from '../actions';


function single(state = {
  isFetching: false
  , item: {}
  , populated: false
  , error: null
  , status: null //creating, editing
}, action) {
  switch(action.type) {
    case singleActions.REQUEST_SINGLE_TEAM:
      return Object.assign({}, state, {
        isFetching: true
        , item: {} // when transitioning within states where this is already populate -- i.e. from 'Single' to 'Update', this forces a refresh on the element, which isn't desirable.  Also, retrieve error is handled below, so this shouldn't be necessary even when calling new instances
        , status: null
      })
    case singleActions.RECEIVE_SINGLE_TEAM:
      if(action.success) {
        return Object.assign({}, state, {
          isFetching: false
          , item: action.team
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
      case singleActions.REQUEST_SINGLE_TEAM_BY_COACH:
        return Object.assign({}, state, {
          isFetching: true
           , item: {}
          , status: null
        })
      case singleActions.RECEIVE_SINGLE_TEAM_BY_COACH:
        if(action.success) {
          console.log("SUCCESS!!!!");
          console.log(action);
          return Object.assign({}, state, {
            isFetching: false
            , item: action.team
            , populated: false
            , error: null
            , lastUpdated: action.receivedAt
          })
        }
      ///////

      case singleActions.SETUP_NEW_TEAM:
        console.log("SETUP_NEW_TEAM");
        return Object.assign({}, state, {
          isFetching: false
          , item: {
            teamname: ""
            , teamimage: ""
            , headcoach: action.headcoach
          }
          , populated: false
        });
      case singleActions.REQUEST_CREATE_TEAM:
        console.log("REQUEST_CREATE_TEAM");
        console.log(action);
        return Object.assign({}, state, {
          isFetching: true
          , item: action.team
          , status: 'creating'
        })
        break;
      case singleActions.RECEIVE_CREATE_TEAM:
        console.log("RECEIVE_CREATE_TEAM");
        console.log(action);
        if(action.success) {
          return Object.assign({}, state, {
            isFetching: false
            , item: action.team
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
      case singleActions.REQUEST_UPDATE_TEAM:
        return Object.assign({}, state, {
          isFetching: true
          , item: action.team
          , status: 'updating'
        })
      case singleActions.RECEIVE_UPDATE_TEAM:
        if(action.success) {
          return Object.assign({}, state, {
            isFetching: false
            , item: action.team
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
