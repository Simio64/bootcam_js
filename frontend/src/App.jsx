import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, Navigate } from 'react-router-dom'
import { io } from 'socket.io-client'

import Login from './views/login/Login.jsx'
import Profile from './views/profile/Profile.jsx'
import Principal from './views/principal/Principal.jsx'

import { initLogin } from './store/actions/user.js'
import { urlBase } from './utils/const.js'

export const socket = io(urlBase)

function App() {
  const state = useSelector(state => state)
  const dispatch = useDispatch()


  useEffect(() => dispatch(initLogin()), [])

  return (
    <main>
      <img className='app-main-bg' src={`/images/background.jpg`} alt="background" />
      <section className='app-main-contend'>
        <Routes>
          <Route path='/login' element={<Login />} />
          {state.user.code === 'LOGGED' ?
            <>
              <Route path='/' element={<Principal />} />
              <Route path='/profile/:id' element={<Profile />} />
              <Route path='*' element={<Navigate to='/' />} />
            </>
            : null}
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      </section>
    </main>
  )
}

export default App