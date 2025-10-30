import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section>
      <h2>Welcome</h2>
      <p>Browse projects and manage tasks. Try the Projects page.</p>
      <p><Link to="/projects">Go to Projects</Link></p>
    </section>
  )
}
