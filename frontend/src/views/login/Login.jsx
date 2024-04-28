import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { login, createUser, serverStatus } from '../../store/actions/user.js'

import './Login.css'

function Login() {
  const [mail, setMail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [newUser, setNewUser] = useState(false)
  const [messageError, setError] = useState('')
  const [server, setServer] = useState(false)

  const dispatch = useDispatch()
  const state = useSelector(state => state.user)
  const navigate = useNavigate()

  const handleSubmit = event => {
    event.preventDefault()
    setError('')
    if (mail === '' || password === '') setError('*Datos Faltantes')
    if (newUser && (mail === '' || password === '' || name === '' || passwordConfirm === '')) setError('*Datos Faltantes')
    if (newUser && password !== passwordConfirm) setError('*Contraseña no coincide')
    if (newUser) dispatch(createUser(name, mail, password))
    else dispatch(login(mail, password))
  }

  const handleChangeState = () => {
    setNewUser(!newUser)
    setError('')
    setMail('')
    setName('')
    setPassword('')
    setPasswordConfirm('')
  }

  useEffect(() => {
    serverStatus()
      .then(() => setServer(true))
      .catch(() => setServer(false))
  }, [])

  useEffect(() => {
    if (state.code === 'LOGGED') navigate('/')
  }, [state])

  return (
    <section id='login'>
      <div id='login_div'>
        <h2>Chat APP!</h2>
        <h3>Ingresa tus datos</h3>
        <br /><br />
        <form onSubmit={handleSubmit}>
          <label className='input-form'>
            <i className="fa-solid fa-envelope"></i>
            <input type="text" name='mail' autoFocus value={mail} onChange={({ target }) => setMail(target.value)} placeholder='notas@mail.com' />
          </label>
          {newUser &&
            <label className='input-form'>
              <i className="fa-solid fa-user"></i>
              <input type="text" name='name' value={name} onChange={({ target }) => setName(target.value)} placeholder='Nick name' />
            </label>
          }
          <label className='input-form'>
            <i className="fa-solid fa-lock"></i>
            <input type="password" name='password' onChange={({ target }) => setPassword(target.value)} value={password} placeholder='Password' />
          </label>
          {newUser &&
            <label className='input-form'>
              <i className="fa-solid fa-lock"></i>
              <input type="password" name='passwordConfirm' onChange={({ target }) => setPasswordConfirm(target.value)} value={passwordConfirm} placeholder='Confirm Password' />
            </label>
          }
          <p className='newUser' onClick={handleChangeState}>{!newUser ? 'Nuevo por aquí?' : 'Ya tengo cuenta!'}</p>
          <br />
          <button>
            <p>{newUser ? "Registrarme" : "Entrar"}</p>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </form>
        {state.code === 'USER OR PASSWORD NO MATCH' ? <p className='highlight'>*usuaro o contraseña no coinciden</p> : null}
        {state.code === 'mail must be unique' ? <p className='highlight'>*El correo ya se encuentra registrado</p> : null}
        {state.code === 'name must be unique' ? <p className='highlight'>*El Nick ya esta en uso</p> : null}
        {messageError !== '' ? <p className='highlight'>{messageError}</p> : null}
        <p id='advertencia'>** LA APP SE ENCUENTRA EN DESARROLLO SE RECOMIENDA UTILIZAR CREDENCIALES FALSAS **</p>
        <div id='server_status'>
          {server ? <><p>Estado del servidor -- </p><div id='green'></div></> : <><p>Server Status -- </p><div id='red'></div></>}
        </div>
      </div>
    </section>
  )
}

export default Login