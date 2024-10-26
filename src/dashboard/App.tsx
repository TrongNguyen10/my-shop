// import { useState } from 'react'
// import './App.css'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './sections/dashboard'
import Admin from '../admin/admin'

function App() {

    return (
        <Routes>
            <Route path='/my-shop/*' element={<Dashboard />} />
            <Route path='/my-shop/admin/*' element={<Admin />} />
        </Routes>
    )
}

export default App
