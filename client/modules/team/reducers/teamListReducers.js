


import  { listActions } from '../actions';



function list(state = {
  isFetching: false
  , items: []
  , pagination: {}
}, action) {
  switch (action.type) {
    case listActions.REQUEST_TEAM_LIST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case listActions.RECEIVE_TEAM_LIST:
      if(action.success) {
        return Object.assign({}, state, {
          isFetching: false
          , items: action.list
          , error: null
          , lastUpdated: action.receivedAt
        })
      } else {
        return Object.assign({}, state, {
          isFetching: false
          , items: []
          , error: action.error
          , lastUpdated: action.receivedAt
        })
      }

    default:
      return state
  }
}

export default list;
