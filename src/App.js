import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { AuthPages } from './Pages/AuthPages'
import './App.scss'
import axios from 'axios'
import { MainPages } from './Pages/MainPages'
import SideBar from './Components/Sidebar'

axios.defaults.baseURL = 'https://cryxxxen.pythonanywhere.com'

function App() {
  const access = localStorage.getItem('accessToken')

  const Navigate = useNavigate()

  React.useEffect(() => {
    if(!access){
      Navigate('/signIn')
    }
  }, [access])
  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={<MainPages.Pages.Main />}
        />
        <Route
          path='/signIn'
          element={<AuthPages.Pages.SignIn />}
        />
        <Route
          path='/signUp'
          element={<AuthPages.Pages.SignUp />}
        />
        <Route
          path='/profile'
          element={<MainPages.Pages.Profile />}
        />
        <Route
          path='/profile:username'
          element={<MainPages.Pages.Profile />}
        />
      </Routes>

      { access ? <SideBar /> : null }
    </div>
  )
}

export default App