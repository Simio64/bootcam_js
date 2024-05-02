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
    if (state.length !== 0) setCharge(false)
    socket.emit('@client/new_user', {
      id: state.user.id,
      name: state.user.name,
      imagen: state.user.imagen
    })
  }, []);

  useEffect(() => {
    socket.on('@server/new_user', data => setOnlineUsers(data))
    socket.on('@server/new_message', () => dispatch(initNotes()))
  }, [socket]);

  return (
    <Main>
      <div className='app-principal-welcome'>
        <h3>Tablero publico </h3>
      </div>
      <div className='app-principal-container'>
        <section className='app-principal-notes'>
          <section>
            <Notes notes={state.notes} charge={charge} />
          </section>
          <section>
            <NoteForm />
          </section>
        </section>
        <section className='app-principal-users'>
          <h4>Usuarios en linea</h4>
          {Users(onlineUsers)}
        </section>
      </div>
    </Main>
  )
}
export default Principal