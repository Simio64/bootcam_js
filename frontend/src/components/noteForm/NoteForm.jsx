import { useDispatch } from 'react-redux'
import { useState } from 'react'

import { createNote } from '../../store/actions/notes.js'
import { socket } from '../../App.jsx'

import './NoteForm.css'

function NewNote() {
  const [note, setNote] = useState()
  const dispatch = useDispatch()

  function handlePostNote(e) {
    e.preventDefault()
    const data = {
      id: localStorage.getItem('id_user'),
      note
    }
    dispatch(createNote(data))
    setNote('')
    socket.emit('@client/new_message')
  }

  return (
    <section className='app-form-note'>
      <form onSubmit={handlePostNote}>
        <textarea name='note' placeholder='Nota' value={note} onChange={({ target }) => setNote(target.value)}></textarea>
        <button>
          <i className="fa-solid fa-paper-plane"></i>
          <p>Enviar</p>
        </button>
      </form>
    </section>
  )
}

export default NewNote