import guessService from '../services/guesses'
import { setNotification } from './notificationReducer';

export const initGuesses = () => {
    return async dispatch => {
        const guesses = await guessService.getAll()
        dispatch({
            type: 'INIT_GUESSES',
            data: guesses
        })
    }
}

export const getGuess = (id) => {
    return async dispatch => {
        const guess = await guessService.getGuess(id)
        dispatch({
        type: 'GET_GUESS',
        data: guess
        })
    }
}

export const createGuess = (guess) => {
    return async dispatch => {
        try {
            const newGuess = await guessService.create(guess)
            dispatch({
                type: 'CREATE_GUESS',
                data: newGuess
            })
            dispatch(setNotification(`Tiedot lisätty`, 'success'))
        } catch (error) {
        dispatch(setNotification('Jotain meni pieleen', 'error'))
        }
    }
}

export const updateGuess = (id, guess) => {
    return async dispatch => {
        try {
        const updatedGuess = await guessService.update(id, guess)
        dispatch({
            type: 'UPDATE_GUESS',
            data: updatedGuess
        })
        dispatch(setNotification('Arvaus muutettu', 'success'))
        } catch (error) {
        dispatch(setNotification('Jotain meni pieleen', 'error'))
        }
    }
}

export const deleteGuess = (id) => {
    return async dispatch => {
        try {
            await guessService.remove(id)
            dispatch({
                type: 'DELETE_GUESS',
                data: id
            })
            dispatch(setNotification('Arvaus poistettu', 'success'))
        } catch (error) {
            dispatch(setNotification('Jotain meni pieleen', 'error'))
        }
    }
}

const guessReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_GUESSES':
        return action.data
        case 'GET_GUESS':
        return action.data
        case 'CREATE_GUESS':
        return [...state, action.data]
        case 'UPDATE_GUESS':
        return state.map(guess => guess.id !== action.data.id ? guess : action.data)
        case 'DELETE_GUESS':
        return state.filter(guess => guess.id !== action.data)
        default:
        return state
    }
}

export default guessReducer
