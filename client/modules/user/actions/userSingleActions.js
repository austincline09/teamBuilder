import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router';

export const REQUEST_SINGLE_USER = "REQUEST_SINGLE_USER";
function requestSingleUser(id) {
  return {
    type: REQUEST_SINGLE_USER
    , id

  }
}

export const RECEIVE_SINGLE_USER = "RECEIVE_SINGLE_USER";
function receiveSingleUser(json) {
  console.log("received", json.user._id);
  return {
    type: RECEIVE_SINGLE_USER
    , id: json.user._id
    , user: json.user
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchSingleUserById(userId) {
  //console.log(userId);
  return dispatch => {
    dispatch(requestSingleUser(userId))
    return fetch(`/api/users/${userId}`)
      .then(response => response.json())
      .then(json => dispatch(receiveSingleUser(json)))
  }
}


export const REQUEST_LOGIN = "REQUEST_LOGIN"
function requestLogin(username) {
  return {
    type: REQUEST_LOGIN
    , username: username
  }
}

export const RECEIVE_LOGIN = "RECEIVE_LOGIN"
function receiveLogin(json) {
  return {
    type: RECEIVE_LOGIN
    , user: json.user
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function sendLogin(username, password) {
  return dispatch => {
    dispatch(requestLogin(username))
    return fetch('/api/users/login', {
      method: 'POST'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
      }
      , credentials: 'same-origin'
      , body: JSON.stringify({
        username: username
        , password: password
      })
    })
    .then(res => res.json())
    .then(json => dispatch(receiveLogin(json)))
    .then((json) => {
      //if they hit this route, where should they redirect to?
      if(json.success) {
        browserHistory.push('/')
      }
    })
  }
}

export const REQUEST_REGISTER = "REQUEST_REGISTER"
function requestRegister(userData) {
  return {
    type: REQUEST_REGISTER
    , userData: userData
  }
}

export const RECEIVE_REGISTER = "RECEIVE_REGISTER"
function receiveRegister(json) {
  return {
    type: RECEIVE_REGISTER
    , user: json.user
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function sendRegister(userData) {
  return dispatch => {
    dispatch(requestRegister(userData))
    return fetch('/api/users', {
      method: 'POST'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
      }
      , body: JSON.stringify(userData)
    })
    .then(res => res.json())
    .then(json => dispatch(receiveRegister(json)))
    .then((json) => {
      if(json.success) {
        browserHistory.push('/')
      }
    })
  }
}

export const REQUEST_LOGOUT = "REQUEST_LOGOUT"
function requestLogout() {
  return {
    type: REQUEST_LOGOUT
  }
}

export const RECEIVE_LOGOUT = "RECEIVE_LOGOUT"
function receiveLogout(json) {
  console.log("Am I getting called?");
  return {
    type: RECEIVE_LOGOUT
    , user: json.user
    , success: json.success
    , error: json.message
    //, status: json ? json.status : "success"
    //, error: json ? json.message : "success"
  }
}

export function sendLogout() {
  return dispatch => {
    dispatch(requestLogout())
    return fetch('/api/users/logout', {
      method: 'POST'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
      }
      , credentials: 'same-origin'
      , body: null
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    // .then(res => res.json())
    .then((json) => {
      console.log("DEBUG 2");
      console.log(json);
      return json;
    })
    .then(json => dispatch(receiveLogout(json)))
    .then((json) => {
      //if they hit this route, where should they redirect to?
      if(json.success) {
        browserHistory.push('/')
      }
    })
  }
}
