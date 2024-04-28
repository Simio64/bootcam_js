import { useDispatch } from 'react-redux'
import { useState } from 'react'

import { createNote } from '../../store/actions/notes.js'
import { socket } from '../../App.jsx'

import './NoteForm.css'

function NewNote() {
  const [note, setNote] = useState()

  const dispatch = useDispatch()

  function handlePostNote(event) {
    event.preventDefault()
    const data = {
      id: localStorage.getItem('id_user'),
      note
    }
    dispatch(createNote(data))
    setNote('')
    socket.emit('@client/new_message')
  }

  return (
    <section id='new_note_form'>
      <form onSubmit={handlePostNote}>
        <textarea name='note' id="text_area" cols="30" rows="10" placeholder='Nota' value={note} onChange={({ target }) => setNote(target.value)}></textarea>
        <button>Enviar</button>
      </form>
    </section>
  )
}

export default NewNote