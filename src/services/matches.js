import axios from 'axios'
const baseUrl = '/api/matches'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getMatch = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const create = (newObject) => {
  const user = window.localStorage.getItem('loggedUser')
  const config = {
    headers: { Authorization: user.token },
  }
  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { getAll, getMatch, create, update, remove }