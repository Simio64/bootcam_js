import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { userNotes } from '../../store/actions/userNotes.js'
import { searchUser } from "../../store/actions/user.js"
import { urlBase } from '../../utils/const.js'

import Principal from "../../templates/main/Main.jsx"
import Notes from '../../components/notes/Notes.jsx'
import { socket } from '../../App.jsx'

import './Profile.css'

const Profile = () => {
  const [user, set_user] = useState({})
  const [notes, set_notes] = useState([])

  const { id } = useParams()

  useEffect(() => {
    searchUser(id).then(data => set_user(data))
    userNotes(id).then(data => set_notes(data))
  }, [id]);

  useEffect(() => {
    socket.on('@server/new_message', () => {
      userNotes(id).then(data => set_notes(data))
    })
  }, [socket]);

  return (
    <Principal>
      <section id='nepe'>
        <div id='profile'>
          <div id='profile_contend'>
            <img src={`${urlBase}/${user.imagen}`} alt="user_img" />
            <div id='contend'>
              <h1 id='name'>{user.name}</h1>
              <p>ID: {id}</p>
              <h2 id='mail'>{user.mail}</h2>
            </div>
          </div>
          <div id='decorador'></div>
          <Notes notes={notes} charge={false} delete_button={id === localStorage.getItem('id_user') ? true : false} />
        </div>
      </section>
    </Principal>
  )
}

export default Profile