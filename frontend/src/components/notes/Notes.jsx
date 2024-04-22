import { format, register } from 'timeago.js'
import { Link } from 'react-router-dom'

import { deleteNote } from '../../store/actions/userNotes.js'
import { urlBase } from '../../utils/const.js'
import { socket } from '../../App.jsx'

import './Notes.css'

function localeFunc(_number, index) {
  return [
    ['justo ahora', 'en un rato'],
    ['hace %s seg', 'en %s segundos'],
    ['hace 1 min', 'en 1 minuto'],
    ['hace %s min', 'en %s minutos'],
    ['hace 1 h', 'en 1 hora'],
    ['hace %s h', 'en %s horas'],
    ['hace 1 d', 'en 1 día'],
    ['hace %s d', 'en %s días'],
    ['hace 1 sem', 'en 1 semana'],
    ['hace %s sem', 'en %s semanas'],
    ['hace 1 m', 'en 1 mes'],
    ['hace %s m', 'en %s meses'],
    ['hace 1 año', 'en 1 año'],
    ['hace %s años', 'en %s años'],
  ][index]
}
register('es', localeFunc);

function Cards(params, delete_button) {
  const handle_delete = ({ target }) => {
    const element = {
      id_comment: target.id,
      id: localStorage.getItem('id_user')
    }
    deleteNote(element)
      .then(() => socket.emit('@client/new_message'))
  }

  return params.map(({ title, note, id_comment, user, imagen, updatedAt, UserId }) => {
    const date = new Date(updatedAt)
    return (
      <div className='card' key={id_comment}>
        <Link to={`/profile/${UserId}`}><img className='user_img' src={`${urlBase}/${imagen}`} alt="user_img" /></Link>
        <div>
          <div className='data_user'>
            <h3 className='titulo'>{user}</h3>
            <p>{format(date, 'es')}</p>
          </div>
          <h4>{title}</h4>
          <p>{note}</p>
          {delete_button && <button className='delete_button' id={id_comment} onClick={handle_delete}> borrar</button>}
        </div>
      </div>
    )
  })
}

// eslint-disable-next-line react/prop-types
const Notes = ({ notes, charge, delete_button = false }) => {
  if (charge) return <p>Cargando...</p>
  else return (
    <section id='cards'>
      <div id='mantel'>{Cards(notes, delete_button)}</div>
    </section>
  )
}

export default Notes