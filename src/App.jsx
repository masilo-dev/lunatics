import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CollectionProvider } from './context/CollectionContext'
import { Toaster } from 'sonner'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import About from './components/About'
import Collection from './components/Collection'
import Services from './components/Services'
import Contact from './components/Contact'
import AdminLogin from './components/admin/AdminLogin'
import AdminDashboard from './components/admin/AdminDashboard'
import CollectionManagement from './components/admin/CollectionManagement'
import ItemForm from './components/admin/ItemForm'
import ProtectedRoute from './components/admin/ProtectedRoute'
import './App.css'

function App() {
  return (
    <Router>
      <AuthProvider>
        <CollectionProvider>
          <div className="min-h-screen bg-background">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={
                <>
                  <Header />
                  <main><Home /></main>
                  <Footer />
                </>
              } />
              <Route path="/about" element={
                <>
                  <Header />
                  <main><About /></main>
                  <Footer />
                </>
              } />
              <Route path="/collection" element={
                <>
                  <Header />
                  <main><Collection /></main>
                  <Footer />
                </>
              } />
              <Route path="/services" element={
                <>
                  <Header />
                  <main><Services /></main>
                  <Footer />
                </>
              } />
              <Route path="/contact" element={
                <>
                  <Header />
                  <main><Contact /></main>
                  <Footer />
                </>
              } />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/collection" element={
                <ProtectedRoute>
                  <CollectionManagement />
                </ProtectedRoute>
              } />
              <Route path="/admin/collection/new" element={
                <ProtectedRoute>
                  <ItemForm />
                </ProtectedRoute>
              } />
              <Route path="/admin/collection/edit/:id" element={
                <ProtectedRoute>
                  <ItemForm />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
          <Toaster />
        </CollectionProvider>
      </AuthProvider>
    </Router>
  )
}

export default App

