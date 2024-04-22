
import { Link } from "react-router-dom"
import { urlBase } from '../../utils/const'
import './Users.css'

function Users(users) {
  return users.map(user => (
      <div className='online_user' key={user.id}>
        <Link to={`/profile/${user.id}`}><img className='online_user_img' src={`${urlBase}/${user.imagen}`} alt="user_img" /></Link>
        <h3>{user.name}</h3>
      </div>
    )
  )
}
export default Users