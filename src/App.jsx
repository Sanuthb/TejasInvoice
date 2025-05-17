import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'

const App = () => {

  return (
    <>
    <Routes>
      <Route path="/home" element={<Home/>}/>
      <Route path="/" element={<Login/>}/>
    </Routes>
    </>
  )
}

export default App
