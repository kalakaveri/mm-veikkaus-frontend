import userService from '../services/users'
import { setNotification } from './notificationReducer'

export const getAll = () => {
  return async dispatch => {
    const users = await userService.getAll()
    
    dispatch({
      type: 'GET_ALL_USERS',
      data: users
    })
  }
}

export const getUser = (id) => {
  return async dispatch => {
    const user = await userService.getUser(id)

    dispatch({
      type: 'GET_USER',
      data: user
    })
  }
}

export const register = (username, password, password2) => {
  return async (dispatch) => {
    try {
      const user = await userService.register({ username, password, password2 })
      dispatch({ type: 'REGISTER', user: user })
      dispatch(setNotification(`Luotiin käyttäjä`, 'success'))
    } catch (error) {
      dispatch(setNotification('Jotain meni pieleen', 'error'))
    }
  }
}    

export const updateUser = (id, user) => {
  return async dispatch => {
    try {

      const updatedUser = await userService.update(id, user)
      dispatch({
        type: 'UPDATE_USER',
        data: updatedUser
      })
      dispatch(setNotification(`Käyttäjän tiedot päivitettiin`, 'success'))
    } catch (error) {
      dispatch(setNotification('Jotain meni pieleen', 'error'))
    }
  }
}

export const deleteUser = (id) => {
  return async dispatch => {
    try {
      await userService.remove(id)
      dispatch({
        type: 'DELETE_USER',
        data: id
      })
      dispatch(setNotification('Käyttäjä poistettiin', 'success'))
    } catch (error) {
      dispatch(setNotification('Jotain meni pieleen', 'error'))
    }
  }
}

const usersReducer = (state = null, action) => {
  switch (action.type) {
    case 'GET_ALL_USERS':
      return action.data
    case 'GET_USER':
      return action.data
    case 'REGISTER':
      return [...state, action.user]
    case 'UPDATE_USER':
      return state.map(user => user.id !== action.data.id ? user : action.data)
    case 'DELETE_USER':
      return state.filter(user => user.id !== action.data)
    default:
      return state
  }
}

export default usersReducer