import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { initNotes } from '../../store/actions/notes.js'

import NoteForm from '../../components/noteForm/NoteForm.jsx'
import Notes from '../../components/notes/Notes.jsx'
import Users from '../../components/users/Users.jsx'
import Main from '../../templates/main/Main.jsx'
import { socket } from '../../App.jsx'

import './Principal.css'

function Principal() {
  const [charge, setCharge] = useState(true)
  const [onlineUsers, setOnlineUsers] = useState([])
  const state = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initNotes())
    if (state.lenth !== 0) setCharge(false)
    socket.emit('@client/new_user', {
      id: state.user.id,
      name: state.user.name,
      imagen: state.user.imagen
    })
  }, []);

  useEffect(() => {
    socket.on('@server/new_user', data => {
      setOnlineUsers(data)
    })
    socket.on('@server/new_message', () => {
      dispatch(initNotes())
    })
  }, [socket]);

  return (
    <Main>
      <div id='Bienvenida'>
        <h1>Bienvenido a la aplicacion de notas</h1>
        <br />
        <h1>Tablero publico: </h1>
      </div>
      <div id='principal_grid'>
        <Notes notes={state.notes} charge={charge} />
        <div id='form_NoteForm_principal'>
          <NoteForm />
          <div>
            <h2>Online Users</h2>
            {Users(onlineUsers)}
          </div>
        </div>
      </div>
    </Main>
  )
}
export default Principal