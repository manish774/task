import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import { useDarkMode } from './hooks/useDarkMode'

export default function App() {
  const { dark, toggle } = useDarkMode()

  return (
    <div className="app">
      <header className="header">
        <h1><Link to="/">Projects Dashboard</Link></h1>
        <nav>
          <Link to="/projects">Projects</Link>
          <button onClick={toggle} aria-pressed={!dark} className="theme-toggle">
            {dark ? 'Dark' : 'Light'}
          </button>
        </nav>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </main>
    </div>
  )
}
