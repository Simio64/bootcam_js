import { NavLink } from 'react-router-dom'
import './Aside.css'

function logout() {
  window.localStorage.clear()
  window.location.reload()
}

function SidePanel() {
  const id = localStorage.getItem('id_user')
  return (
    <aside id='panel' >
      <h1>Panel de admin</h1>
      <div>
        <h3>Menu</h3>
        <ul>
          <li>
            <NavLink className={({ isActive }) => (isActive ? 'active nav' : 'nav')} to='/'>
              <i className="fa-solid fa-house"></i>
              <p className='formato'> Principal</p>
            </NavLink>
          </li>
          <li>
            <NavLink className='nav' to={`/profile/${id}`}>
              <i className="fa-solid fa-user"></i>
              <p className='formato'> Mi perfil</p>
            </NavLink>
          </li>
        </ul>
      </div>
      <div id='panel-button' onClick={logout}><button id='logout_button'><i className="fa-solid fa-arrow-right-from-bracket"></i> <p className='formato'> Logout</p></button></div>
    </aside>
  )
}

export default SidePanel