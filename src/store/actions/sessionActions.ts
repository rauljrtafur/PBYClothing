import { SET_SESSION, SET_SHOW_LOGIN } from '../types'

export function setSessionAction(session) {
  return (dispatch) => { dispatch(setSession(session)) }
}
export function setShowLoginAction(showLogin) {
  return (dispatch) => { dispatch(setShowLogin(showLogin)) }
}

const setSession = (session) => ({
  type: SET_SESSION,
  payload: session
})

const setShowLogin = (showLogin: boolean) => ({
  type: SET_SHOW_LOGIN,
  payload: showLogin
})