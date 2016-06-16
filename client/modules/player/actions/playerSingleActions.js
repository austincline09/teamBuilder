//Player Single Actions

import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router';


export const REQUEST_SINGLE_PLAYER = "REQUEST_SINGLE_PLAYER";
function requestSinglePlayer(id) {
  return {
    type: REQUEST_SINGLE_PLAYER
    , id

  }
}

export const RECEIVE_SINGLE_PLAYER = "RECEIVE_SINGLE_PLAYER";
function receiveSinglePlayer(json) {
  console.log("received", json.player._id);
  return {
    type: RECEIVE_SINGLE_PLAYER
    , id: json.player._id
    , player: json.player
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchSinglePlayerById(playerId) {
  return dispatch => {
    dispatch(requestSinglePlayer(playerId))
    return fetch(`/api/players/${playerId}`)
      .then(response => response.json())
      .then(json => dispatch(receiveSinglePlayer(json)))
  }
}

////////
export const REQUEST_SINGLE_PLAYER_BY_TEAM = "REQUEST_SINGLE_PLAYER_BY_TEAM";
function requestSinglePlayerByTeam(teamid) {
  return {
    type: REQUEST_SINGLE_PLAYER_BY_TEAM
    , teamid
  }
}

export const RECEIVE_SINGLE_PLAYER_BY_TEAM = "RECEIVE_SINGLE_PLAYER_BY_TEAM";
function receiveSinglePlayerByTeam(json) {
  console.log("received", json.player._id);
  return {
    type: RECEIVE_SINGLE_PLAYER_BY_TEAM
    , id: json.player._id
    , player: json.player
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchSinglePlayerByTeam(teamid) {
  return dispatch => {
    dispatch(requestSinglePlayerByTeam(teamid))
    return fetch(`/api/player/byTeam/${teamid}`)
      .then(response => response.json())
      .then(json => dispatch(receiveSinglePlayerByTeam(json)))
  }
}
////////

/***************

CREATE ACTIONS

***************/

export const REQUEST_SETUP_NEW_PLAYER = "REQUEST_SETUP_NEW_PLAYER";
function requestSetupNewPlayer() {
  return {
    type: REQUEST_SETUP_NEW_PLAYER
  }
}

export const SETUP_NEW_PLAYER = "SETUP_NEW_PLAYER";
export function setupNewPlayer() {
  return {
    type: SETUP_NEW_PLAYER
  }
}

export const REQUEST_CREATE_PLAYER = "REQUEST_CREATE_PLAYER";
function requestCreatePlayer(player) {
  return {
    type: REQUEST_CREATE_PLAYER
    , player
  }
}


export const RECEIVE_CREATE_PLAYER = "RECEIVE_CREATE_PLAYER";
function receiveCreatePlayer(json) {
  return {
    type: RECEIVE_CREATE_PLAYER
    , player: json.player
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}


export function sendCreatePlayer(data) {
  console.log("sendCreatePlayer")
  console.log(data);
  return dispatch => {
    dispatch(requestCreatePlayer(data))
    return fetch('/api/players', {
      method: 'POST'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
      }
      , body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => dispatch(receiveCreatePlayer(json)))
    .then((json) => {
      console.log("chck rediredt");
      console.log(json);
      if(json.success) {
        //redirect to teamid route
        browserHistory.push(`/players/${json.player._id}`)
        // //redirect to byId route
        // browserHistory.push(`/news/byId/${json.player._id}`)
      }
    })
  }
}

/***************

UPDATE ACTIONS

***************/


export const REQUEST_UPDATE_PLAYER = "REQUEST_UPDATE_PLAYER";
function requestUpdatePlayer(player) {
  return {
    type: REQUEST_UPDATE_PLAYER
    , player
  }
}

export const RECEIVE_UPDATE_PLAYER = "RECEIVE_UPDATE_PLAYER";
function receiveUpdatePlayer(json) {
  return {
    type: RECEIVE_UPDATE_PLAYER
    , player: json.player
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}



export function sendUpdatePlayer(data) {
  return dispatch => {
    dispatch(requestUpdatePlayer(data))
    return fetch(`/api/players/${data._id}`, {
      method: 'PUT'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
      }
      , body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => dispatch(receiveUpdatePlayer(json)))
    .then((json) => {
      if(json.success) {
        //redirect to teamid route
        browserHistory.push(`/players/${json.player._id}`)
        // //redirect to byId route
        // browserHistory.push(`/news/byId/${json.player._id}`)
      }
    })
  }
}
