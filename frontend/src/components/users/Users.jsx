
import { Link } from "react-router-dom"
import { urlBase } from '../../utils/const'
import './Users.css'

function Users(users) {
  return users.map(user => (
    <div key={user.id}>
      <Link className='app-online' to={`/profile/${user.id}`}>
        <img className='app-online-img' src={`${urlBase}/${user.imagen}`} alt="user_img" />
        <h4>{user.name}</h4>
      </Link>
    </div>
  )
  )
}
export default Users