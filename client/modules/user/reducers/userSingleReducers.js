import * as Actions from '../actions/userSingleActions';

function single(state = {
  isFetching: false
  , error: null
  , status: null
  , user: {}
  }, action) {
    switch(action.type) {
      case Actions.REQUEST_LOGIN:
        return Object.assign({}, state, {
          isFetching: true
          , user: {
              username: action.username
          }
          , error: null
          , status: null
        })
      case Actions.RECEIVE_LOGIN:
        if(action.success) {
          return Object.assign({}, state, {
            isFetching: false
            , user: action.user
            , error: null
          })
        } else {
          return Object.assign({}, state, {
            isFetching: false
            , user: {}
            , error: action.error
          })
        }
        ////
        case Actions.REQUEST_LOGOUT:
          return Object.assign({}, state, {
            isFetching: true
            , user: {
            }
            , error: null
            , status: null
          })

        case Actions.RECEIVE_LOGOUT:
          if(action.success) {
            return Object.assign({}, state, {
              isFetching: false
              , user: {
                userid: ""
              }
              , error: null
            })
          } else {
            return Object.assign({}, state, {
              isFetching: false
              , error: action.error
            })
          }
        //////
        case Actions.REQUEST_SINGLE_USER:
          return Object.assign({}, state, {
            isFetching: true
            // , item: {} // when transitioning within states where this is already populate -- i.e. from 'Single' to 'Update', this forces a refresh on the element, which isn't desirable.  Also, retrieve error is handled below, so this shouldn't be necessary even when calling new instances
            , status: null
          })
        case Actions.RECEIVE_SINGLE_USER:
          if(action.success) {
            return Object.assign({}, state, {
              isFetching: false
              , item: action.user
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
      default:
        return state
    }
  }

export default single;
