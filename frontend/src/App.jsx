import React from 'react'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import ListarMascotas from './pages/ListarMascotas'
import CreatePets from './pages/CreatePets'
import ConsultPets from './pages/consultPets'

function App() {
  return (
    <Routes>
      <Route path='/' Component={Login} />
      <Route path='/inicio' Component={ListarMascotas} />
      <Route path='/create' Component={CreatePets} />
      <Route path='/consult/:id' Component={ConsultPets}/>
    </Routes>
  )
}

export default App
