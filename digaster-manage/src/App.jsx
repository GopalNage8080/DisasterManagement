import React from 'react'
import Register from './user/Register'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './user/Dashboard'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Temprature from './user/Temprature'
import History from './user/History'

const App = () => {
  return <>
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/temp' element={<Temprature />} />
        <Route path='/dash' element={<Dashboard />} />
        <Route path='/his' element={<History />} />
        <Route path='/' element={<Register />} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App