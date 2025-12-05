import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import About from './components/About'
import Collection from './components/Collection'
import Services from './components/Services'
import Contact from './components/Contact'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'
import AdminCollectionCMS from './components/AdminCollectionCMS'
import AdminServicesCMS from './components/AdminServicesCMS'
import './App.css'

const AppRoutes = () => {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <div className="min-h-screen bg-background">
      {!isAdminRoute && <Header />}
      <main>
        <Routes>
          {/* Public marketing site */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin / CMS & CRM */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/collection" element={<AdminCollectionCMS />} />
          <Route path="/admin/services" element={<AdminServicesCMS />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App

