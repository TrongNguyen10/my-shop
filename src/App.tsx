// import { useState } from 'react'
// import './App.css'
import { Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard/sections/dashboard";
import Admin from "./admin/admin";
import LoginForm from "./admin/components/loginForm";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Dashboard />} />
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
}

export default App;
