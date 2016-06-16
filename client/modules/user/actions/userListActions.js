//User List Actions

import fetch from 'isomorphic-fetch'

export const REQUEST_USER_LIST = "REQUEST_USER_LIST"
function requestUserList() {
  console.log('requesting users list')
  return {
    type: REQUEST_USER_LIST
  }
}

export const RECEIVE_USER_LIST = "RECEIVE_USER_LIST"
function receiveUserList(json) {
  return {
    type: RECEIVE_USER_LIST
    , list: json.users
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchList() {
  //console.log("hey bro"); 
  return dispatch => {
    dispatch(requestUserList())
    return fetch('/api/users')
      .then(response => response.json())
      .then(json =>
        dispatch(receiveUserList(json))
      )
  }
}
