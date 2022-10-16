export const setNotification = (message, isSuccess) => {
  return async (dispatch) => {
    dispatch({
      type: 'NEW-NOTIFICATION',
      data: { message: message, type: isSuccess }
    })
    setTimeout(() => {
      dispatch({ type: 'HIDE-NOTIFICATION', data: null })
    }, 3000)
  }
}

export const hideNotification = () => {
  return async (dispatch) => {
    dispatch({
      type: 'HIDE_NOTIFICATION',
      data: { message: null }
    })
  }
}


const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'NEW-NOTIFICATION':
      return action.data
    case 'HIDE-NOTIFICATION':
      return action.data
    default: return state
  }
}

export default notificationReducer