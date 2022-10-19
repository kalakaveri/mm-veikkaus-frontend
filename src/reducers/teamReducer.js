import teamService from '../services/teams'
import { setNotification } from './notificationReducer'

export const initTeams = () => {
  return async dispatch => {
    const teams = await teamService.getAll()
    dispatch({
      type: 'INIT_TEAMS',
      data: teams
    })
  }
}

export const getTeam = (id) => {
  return async dispatch => {
    const team = await teamService.getTeam(id)
    dispatch({
      type: 'GET_TEAM',
      data: team
    })
  }
}

export const createTeam = (team) => {
  return async dispatch => {
    try {

      const newTeam = await teamService.create(team)
      dispatch({
        type: 'CREATE_TEAM',
        data: newTeam
      })
      dispatch(setNotification(`Luotiin joukkue`, 'success'))
    } catch (error) {
      dispatch(setNotification('Jotain meni pieleen', 'error'))
    }
  }
}

export const updateTeam = (team) => {
  return async dispatch => {
    try {
      const updatedTeam = await teamService.update(team.id, team)
      dispatch({
        type: 'UPDATE_TEAM',
        data: updatedTeam
      })

      dispatch(setNotification(`Joukkueen tiedon päivitettiin`, 'success'))
    } catch (error) { 
      dispatch(setNotification('Jotain meni pieleen', 'error'))
    }
  }
}

export const deleteTeam = (id) => {
  return async dispatch => {
    try {
      await teamService.remove(id)
      dispatch({
        type: 'DELETE_TEAM',
        data: id
      })
      dispatch(setNotification('Joukkue poistettiin', 'success'))
    } catch (error) {
      dispatch(setNotification('Jotain meni pieleen', 'error'))
    }
  }
}

export const teamReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_TEAMS':
      return action.data
    case 'GET_TEAM':
      return action.data
    case 'CREATE_TEAM':
      return [...state, action.data]
    case 'UPDATE_TEAM':
      return state.map(t => t.name !== action.data.name ? t : action.data)
    case 'DELETE_TEAM':
      return state.filter(team => team.id !== action.data)
    default:
      return state
  }
}

export default teamReducer