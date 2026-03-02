import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Layout } from '@/components/layout/Layout'
import Login from '@/features/auth/pages/Login'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Layout />} />
    </Routes>
  )
}

export default App
