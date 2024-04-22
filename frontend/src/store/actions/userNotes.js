import axios from 'axios'
import { urlBase } from '../../utils/const.js'

export const userNotes = async (id) => {
  const token = localStorage.getItem('token')
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const { data } = await axios.get(`${urlBase}/api/comments/user/${id}`, config)
  return await data
}

export const deleteNote = async (credentials) => {
  const token = localStorage.getItem('token')
  axios.delete(`${urlBase}/api/comments`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { ...credentials }
  })
    .then(response => response.data)
    .catch(false)
}