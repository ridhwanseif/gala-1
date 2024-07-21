import { useState } from 'react'
import NavBar from './utils/NavBar'
import Sidebar from './utils/Sidebar'
import Dashboard from './component/dashboard/Dashboard'
import { Route, Routes } from 'react-router-dom'
import 'rsuite/dist/rsuite.min.css';
import Login from './component/logIn/Login'
// import RequireAuth from './RequireAuth'
import RouteLoyOut from './RouteLoyOut'

function App() {

  return (
    <>

      <Routes>
        <Route path="/login" element={<Login />} />

        {/* protected Route */}
        {/* <Route element={<RequireAuth />}> */}
        <Route path="*" element={<RouteLoyOut />} />
        {/* </Route> */}
      </Routes>
      {/* <Dashboard /> */}

    </>
  )
}

export default App
