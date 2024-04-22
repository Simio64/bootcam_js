
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { login, createUser, serverStatus } from '../../store/actions/user.js'

import './Login.css'

function Login() {
  const [mail, setMail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [newUser, setNewUser] = useState(false)
  const [error, setError] = useState('')
  const [server, setServer] = useState(false)

  const dispatch = useDispatch()
  const state = useSelector(state => state.user)
  const navigate = useNavigate()

  const handleSubmit = event => {
    event.preventDefault()
    if (mail === '' || password === '') {
      setError('*Datos Faltantes')
      return
    }
    if (newUser === true && (mail === '' || password === '' || name === '' || passwordConfirm === '')) {
      setError('*Datos Faltantes')
      return
    }
    if (newUser === true && password !== passwordConfirm) {
      setError('*Contraseña no coincide')
      return
    }
    setError('')
    if (newUser) dispatch(createUser(name, mail, password))
    else dispatch(login(mail, password))
  }

  useEffect(() => {
    if (state.code === 'LOGGED') navigate('/')
  }, [dispatch, state, handleSubmit]);

  useEffect(() => {
    serverStatus()
      .then(() => setServer(true))
      .catch(() => setServer(false))
  }, [handleSubmit])

  return (
    <section id='login'>
      <div id='login_div'>
        <p id='advertencia'>** LA APP SE ENCUENTRA EN DESARROLLO XFAVOR UTILIZAR CREDENCIALES FALSAS **</p>
        <h2>App de notas</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name='mail' autoFocus value={mail} onChange={({ target }) => setMail(target.value)} placeholder='notas@mail.com' />
          {newUser ? <input type="text" name='name' value={name} onChange={({ target }) => setName(target.value)} placeholder='Nick name' /> : null}
          <input type="password" name='password' onChange={({ target }) => setPassword(target.value)} value={password} placeholder='Password' />
          {newUser ?
            <>
              <input type="password" name='passwordConfirm' onChange={({ target }) => setPasswordConfirm(target.value)} value={passwordConfirm} placeholder='Confirm Password' />
              <button>Crear usuario</button>
            </>
            : <button>Validar</button>
          }

        </form>
        {!newUser ? <p className='newUser' onClick={() => setNewUser(!newUser)}>Nuevo por aqui?</p> : <p className='newUser' onClick={() => setNewUser(!newUser)}>Ya tengo cuenta</p>}
        {state.code === 'USER OR PASSWORD NO MATCH' ? <p className='highlight'>*usuaro o contraseña no coinciden</p> : null}
        {state.code === 'mail must be unique' ? <p className='highlight'>*El correo ya se encuentra registrado</p> : null}
        {state.code === 'name must be unique' ? <p className='highlight'>*El Nick ya esta en uso</p> : null}
        {error !== '' ? <p className='highlight'>{error}</p> : null}
        <div id='server_status'>
          {server ? <><p>Server Status -- </p><div id='green'></div></> : <><p>Server Status -- </p><div id='red'></div></>}
        </div>
      </div>
    </section>
  )
}

export default Login