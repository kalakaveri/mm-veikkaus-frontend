import authService from '../services/auth'
import { setNotification } from './notificationReducer'

export const initUser = () => {
  return async dispatch => {
    const userdata = await authService.initUser()
    dispatch({ type: 'INIT-USER', user: userdata })
  }
}

export const login = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await authService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      authService.setToken(user.token)
      dispatch({ type: 'LOGIN', user: user })
      dispatch(setNotification(`Lykkyä pyttyyn ${user.username}!`, true))
    } catch (error) {
      dispatch(setNotification('Käyttäjä tai salasana oli väärin', error))
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    try {
      const data = await authService.logout()
      dispatch({ type: 'LOGOUT', user: data })
      dispatch(setNotification('logged out', true))
    } catch (error) {
      dispatch(setNotification('Jotain meni pieleen', false))
    }
  }
}

const authReducer = (state = { role: 'guest' }, action) => {
  switch (action.type) {
    case 'INIT-USER':
      return action.user
    case 'LOGIN':
      return action.user
    case 'LOGOUT':
      return action.user
    default:
      return state
  }
}

export default authReducer