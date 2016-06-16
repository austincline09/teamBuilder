//Team Single Actions

import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router';


export const REQUEST_SINGLE_TEAM = "REQUEST_SINGLE_TEAM";
function requestSingleTeam(id) {
  return {
    type: REQUEST_SINGLE_TEAM
    , id

  }
}

export const RECEIVE_SINGLE_TEAM = "RECEIVE_SINGLE_TEAM";
function receiveSingleTeam(json) {
  console.log("received", json.team._id);
  return {
    type: RECEIVE_SINGLE_TEAM
    , id: json.team._id
    , team: json.team
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchSingleTeamById(teamId) {
  return dispatch => {
    dispatch(requestSingleTeam(teamId))
    return fetch(`/api/teams/${teamId}`)
      .then(response => response.json())
      .then(json => dispatch(receiveSingleTeam(json)))
  }
}

////////
export const REQUEST_SINGLE_TEAM_BY_COACH = "REQUEST_SINGLE_TEAM_BY_COACH";
function requestSingleTeamByCoach(userid) {
  return {
    type: REQUEST_SINGLE_TEAM_BY_COACH
    , userid
  }
}

export const RECEIVE_SINGLE_TEAM_BY_COACH = "RECEIVE_SINGLE_TEAM_BY_COACH";
function receiveSingleTeamByCoach(json) {
  console.log("received", json.team._id);
  return {
    type: RECEIVE_SINGLE_TEAM_BY_COACH
    , id: json.team._id
    , team: json.team
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchSingleTeamByCoach(userid) {
  return dispatch => {
    dispatch(requestSingleTeamByCoach(userid))
    console.log("FETCHING");
    return fetch(`/api/teams/byCoach/${userid}`)
      .then(response => response.json())
      .then(json => dispatch(receiveSingleTeamByCoach(json)))
  }
}
////////

/***************

CREATE ACTIONS

***************/

export const REQUEST_SETUP_NEW_TEAM = "REQUEST_SETUP_NEW_TEAM";
function requestSetupNewTeam() {
  return {
    type: REQUEST_SETUP_NEW_TEAM
  }
}

export const SETUP_NEW_TEAM = "SETUP_NEW_TEAM";
export function setupNewTeam() {
  return {
    type: SETUP_NEW_TEAM
  }
}

export const REQUEST_CREATE_TEAM = "REQUEST_CREATE_TEAM";
function requestCreateTeam(team) {
  return {
    type: REQUEST_CREATE_TEAM
    , team
  }
}


export const RECEIVE_CREATE_TEAM = "RECEIVE_CREATE_TEAM";
function receiveCreateTeam(json) {
  return {
    type: RECEIVE_CREATE_TEAM
    , team: json.team
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}


export function sendCreateTeam(data) {
  console.log("sendCreateTeam")
  console.log(data);
  return dispatch => {
    dispatch(requestCreateTeam(data))
    return fetch('/api/teams', {
      method: 'POST'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
      }
      , body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => dispatch(receiveCreateTeam(json)))
    .then((json) => {
      console.log("chck rediredt");
      console.log(json);
      if(json.success) {
        //redirect to slug route
        browserHistory.push(`/teams/${json.team._id}`)
        // //redirect to byId route
        // browserHistory.push(`/news/byId/${json.team._id}`)
      }
    })
  }
}

/***************

UPDATE ACTIONS

***************/


export const REQUEST_UPDATE_TEAM = "REQUEST_UPDATE_TEAM";
function requestUpdateTeam(team) {
  return {
    type: REQUEST_UPDATE_TEAM
    , team
  }
}

export const RECEIVE_UPDATE_TEAM = "RECEIVE_UPDATE_TEAM";
function receiveUpdateTeam(json) {
  return {
    type: RECEIVE_UPDATE_TEAM
    , team: json.team
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}



export function sendUpdateTeam(data) {
  return dispatch => {
    dispatch(requestUpdateTeam(data))
    return fetch(`/api/teams/${data._id}`, {
      method: 'PUT'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
      }
      , body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => dispatch(receiveUpdateTeam(json)))
    .then((json) => {
      if(json.success) {
        //redirect to slug route
        browserHistory.push(`/teams/${json.team._id}`)
        // //redirect to byId route
        // browserHistory.push(`/news/byId/${json.team._id}`)
      }
    })
  }
}
