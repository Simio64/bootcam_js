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
  }, [id]);

  return (
    <Principal>
      <section className="app-profile">
        <div className='app-profile-contend'>
          <img src={`${urlBase}/${user.imagen}`} alt="user_img" />
          <div className='app-profile-data'>
            <h1>{user.name}</h1>
            <h3>{user.mail}</h3>
            <p>ID: {id}</p>
          </div>
        </div>
        <Notes notes={notes} charge={false} delete_button={id === localStorage.getItem('id_user') ? true : false} />
      </section>
    </Principal>
  )
}

export default Profile