import axios from 'axios'
import { urlBase } from '../../utils/const.js'

const getNotes = (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  return axios.get(`${urlBase}/api/comments`, config)
    .then(response => response.data)
    .catch(false)
}

function postNote(token, credentials) {
  const config = { headers: { Authorization: `Bearer ${token}` } }

  return axios.post(`${urlBase}/api/comments`, credentials, config)
    .then(response => response.data)
    .catch(false)
}

export const initNotes = () => {
  return async (dispatch) => {
    const notes = await getNotes(localStorage.getItem('token'))
    dispatch({
      type: '@notes/init',
      payload: notes
    })
  }
}

export const createNote = element => {
  return async (dispatch) => {
    const notes = await postNote(localStorage.getItem('token'), element)
    dispatch({
      type: '@notes/create_new_note',
      payload: notes
    })
  }
}
