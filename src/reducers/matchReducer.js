import matchService from '../services/matches'
import { setNotification } from './notificationReducer';

export const initMatches = () => {
  return async dispatch => {
    const matches = await matchService.getAll()
    //matches.sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
    matches.sort(function(a, b){
      var aa = a.date.split('-')
      var bb = b.date.split('-')
      return aa[2] - bb[2] || aa[1] - bb[1] || aa[0] - bb[0] || a.time.localeCompare(b.time)
    })
    dispatch({
      type: 'INIT_MATCHES',
      data: matches
    })
  }
}

export const getMatch = (id) => {
  return async dispatch => {
    const match = await matchService.getMatch(id)
    dispatch({
      type: 'GET_MATCH',
      data: match
    })
  }
}

export const createMatch = (match) => {
  return async dispatch => {
    try {
      const newMatch = await matchService.create(match)
      dispatch({
        type: 'CREATE_MATCH',
        data: newMatch
      })
      dispatch(setNotification(`Ottelun lisäys onnistui`, 'success'))
    } catch (error) {
      dispatch(setNotification('Jotain meni pieleen', 'error'))
    }
  }
}

export const updateMatch = (id, newMatch) => {
  return async dispatch => {
    try {
      console.log('newMatch :>> ', newMatch);
      const updatedMatch = await matchService.update(id, newMatch)
      dispatch({
        type: 'UPDATE_MATCH',
        data: updatedMatch
      })
      dispatch(setNotification(`Ottelu päivitetty`, 'success'))
    } catch (error) {
      dispatch(setNotification('Jotain meni pieleen', 'error'))
    }
  }
}

export const deleteMatch = (id) => {
  return async dispatch => {
    try {
      await matchService.remove(id)
      dispatch({
        type: 'DELETE_MATCH',
        data: id
      })
      dispatch(setNotification('Match deleted', true))
    }
    catch (error) {
      dispatch(setNotification('Jotain meni pieleen', false))
    }
  }
}

const matchReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_MATCHES':
      return action.data
    case 'GET_MATCH':
      return action.data
    case 'CREATE_MATCH':
      return [...state, action.data]
    case 'UPDATE_MATCH':
      return state.map(match => match.id === action.data.id ? action.data : match)
    case 'DELETE_MATCH':
      return state.filter(match => match.id !== action.data)
    default:
      return state
  }
}

export default matchReducer