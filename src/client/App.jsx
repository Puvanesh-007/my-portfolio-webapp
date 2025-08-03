import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MessagesAdmin } from './components/admin.jsx';
import { Navbar, Footer } from './components/PortfolioComponents'
import { About, Education, Skills, Projects, Certificates, Contact } from './pages/PortfolioPages'
import './styles/PortfolioComponents.scss'
import './styles/PortfolioPages.scss'
import './styles/admin.scss'

// Main Portfolio Component
const Portfolio = ({ activeElem, setActiveElem }) => {
  return (
    <>
      <Navbar activeElem={activeElem} setActiveElem={setActiveElem} />
      <main className="pt-20 px-4 max-w-7xl mx-auto">
        <About />
        <Education />
        <Skills />
        <Projects />
        <Certificates />
        <Contact />
      </main>
      <Footer activeElem={activeElem} setActiveElem={setActiveElem} />
    </>
  )
}

// Admin Layout Component
const AdminLayout = () => {
  return (
    <div className="admin-layout">
      {/* Simple admin header */}
      <header className="admin-header bg-white shadow-sm border-b px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Portfolio Admin</h1>
          <a 
            href="/" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Portfolio
          </a>
        </div>
      </header>
      
      {/* Admin content */}
      <main className="admin-main p-6">
        <MessagesAdmin />
      </main>
    </div>
  )
}

function App() {
  const [activeElem, setActiveElem] = useState('About')

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Main Portfolio Route */}
          <Route 
            path="/" 
            element={
              <Portfolio 
                activeElem={activeElem} 
                setActiveElem={setActiveElem} 
              />
            } 
          />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />} />
          <Route path="/admin/messages" element={<AdminLayout />} />
          
          {/* Catch all route - redirect to home */}
          <Route path="*" element={
            <Portfolio 
              activeElem={activeElem} 
              setActiveElem={setActiveElem} 
            />
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App