import axios from 'axios'
const baseUrl = '/api/login'

// eslint-disable-next-line no-unused-vars
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

export const initUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    setToken(user.token)
    return user
  }
  const user = { role: 'guest', token: null }
  return user
}

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export const logout = async () => {
  const response = await axios.post('/api/logout')
  window.localStorage.removeItem('loggedUser')
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { setToken, initUser, login, logout }