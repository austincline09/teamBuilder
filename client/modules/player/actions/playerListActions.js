//Player List Actions

import fetch from 'isomorphic-fetch'

export const REQUEST_PLAYER_LIST = "REQUEST_PLAYER_LIST"
function requestPlayerList() {
  console.log('requesting players list')
  return {
    type: REQUEST_PLAYER_LIST
  }
}

export const RECEIVE_PLAYER_LIST = "RECEIVE_PLAYER_LIST"
function receivePlayerList(json) {
  return {
    type: RECEIVE_PLAYER_LIST
    , list: json.players
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchList() {
  return dispatch => {
    dispatch(requestPlayerList())
    return fetch('/api/players')
      .then(response => response.json())
      .then(json =>
        dispatch(receivePlayerList(json))
      )
  }
}
