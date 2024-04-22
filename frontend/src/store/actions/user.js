import axios from 'axios'
import { urlBase } from '../../utils/const.js'

export const login = (mail, password) => {
  return async (dispatch) => {
    axios.post(`${urlBase}/api/user/login`, { mail, password })
      .then(({ data }) => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('id_user', data.id)
        dispatch({
          type: '@user/init',
          payload: data
        })
      })
      .catch(error => {
        dispatch({
          type: '@user/fail',
          payload: { code: error.response.data.code }
        })
      })
  }
}

export const initLogin = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('token')
    const config = { headers: { Authorization: `Bearer ${token}` } }
    if (token) {
      axios.post(`${urlBase}/api/user/login_token`, { token }, config)
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('id_user', data.id)
          dispatch({
            type: '@user/init',
            payload: data
          })
        })
        .catch(() => {
          dispatch({ type: '@user/fail' })
        })
    }
    else dispatch()
  }
}

export const createUser = (name, mail, password) => {
  return async (dispatch) => {
    axios.post(`${urlBase}/api/user`, { name, mail, password })
      .then(({ data }) => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('id_user', data.id)
        dispatch({
          type: '@user/init',
          payload: { code: 'LOGGED', ...data }
        })
      })
      .catch(error => {
        console.log(error.response.data.errors[0].param)
        dispatch({
          type: '@user/fail',
          payload: { code: error.response.errors[0] }
        })
      })
  }
}

export const searchUser = async (id) => {
  const token = localStorage.getItem('token')
  const config = { headers: { Authorization: `Bearer ${token}` } }
  return axios.get(`${urlBase}/api/user/${id}`, config)
    .then(({ data }) => data)
    .catch(null)
}

export const serverStatus = async () => {
  return axios.get(`${urlBase}/api/`)
    .then(({ data }) => data)
    .catch(null)
}