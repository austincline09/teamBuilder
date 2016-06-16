//Team List Actions

import fetch from 'isomorphic-fetch'

export const REQUEST_TEAM_LIST = "REQUEST_TEAM_LIST"
function requestTeamList() {
  console.log('requesting teams list')
  return {
    type: REQUEST_TEAM_LIST
  }
}

export const RECEIVE_TEAM_LIST = "RECEIVE_TEAM_LIST"
function receiveTeamList(json) {
  return {
    type: RECEIVE_TEAM_LIST
    , list: json.teams
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchList() {
  return dispatch => {
    dispatch(requestTeamList())
    return fetch('/api/teams')
      .then(response => response.json())
      .then(json =>
        dispatch(receiveTeamList(json))
      )
  }
}
