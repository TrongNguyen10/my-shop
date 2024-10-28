// import { useState } from 'react'
// import './App.css'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './sections/dashboard'
import Admin from '../admin/admin'

function App() {

    return (
        <Routes>
            <Route path='/*' element={<Dashboard />} />
            <Route path='/admin/*' element={<Admin />} />
        </Routes>
    )
}

export default App
