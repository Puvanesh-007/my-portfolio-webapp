import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Navbar, Footer } from './components/PortfolioComponents'
import { About, Education, Skills, Projects, Certificates, Contact } from './pages/PortfolioPages'
import './styles/PortfolioComponents.scss'
import './styles/PortfolioPages.scss'

function App() {
  const [activeElem, setActiveElem] = useState('About')

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
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
      </div>
    </Router>
  )
}

export default App