import { NavLink } from 'react-router-dom'
import './Aside.css'

function logout() {
  window.localStorage.clear()
  window.location.reload()
}

function SidePanel() {
  const id = localStorage.getItem('id_user')
  return (
    <aside className='app-sidePanel'>
      <h3>Chat App</h3>
      <nav>
        <NavLink className='app-sidePanel-nav' to='/'>
          <i className="fa-solid fa-house"></i>
          <p> Principal</p>
        </NavLink>
        <NavLink className='app-sidePanel-nav' to={`/profile/${id}`}>
          <i className="fa-solid fa-user"></i>
          <p> Mi perfil</p>
        </NavLink>
      </nav>
      <button onClick={logout}><i className="fa-solid fa-arrow-right-from-bracket"></i> <p> Logout</p></button>
    </aside>
  )
}

export default SidePanel