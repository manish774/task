import React, { useEffect, useMemo, useState, useRef } from 'react'
import ProjectCard from '../components/ProjectCard'

function debounce(fn, delay) {
  let t
  return (...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...args), delay)
  }
}

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [sortBy, setSortBy] = useState('lastUpdated')
  const pendingQueryRef = useRef(query)

  useEffect(() => {
    fetch('/data/projects.json').then(r => r.json()).then(d => setProjects(d.projects || []))
  }, [])

  // debounced query setter
  const setDebouncedQuery = useMemo(() => debounce(q => setQuery(q), 300), [])

  function handleSearch(e) {
    pendingQueryRef.current = e.target.value
    setDebouncedQuery(e.target.value)
  }

  const filtered = useMemo(() => {
    let list = [...projects]
    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter(p => p.name.toLowerCase().includes(q))
    }
    if (status !== 'All') {
      list = list.filter(p => p.status === status)
    }
    if (sortBy === 'lastUpdated') {
      list.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
    } else {
      list.sort((a, b) => ( (b.tasks?.length || 0) - (a.tasks?.length || 0) ))
    }
    return list
  }, [projects, query, status, sortBy])

  return (
    <section>
      <h2>Projects</h2>

      <div className="controls">
        <label>
          Search
          <input aria-label="Search projects" defaultValue={pendingQueryRef.current} onChange={handleSearch} />
        </label>

        <label>
          Status
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option>All</option>
            <option>Active</option>
            <option>Paused</option>
            <option>Completed</option>
          </select>
        </label>

        <label>
          Sort by
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="lastUpdated">Last Updated</option>
            <option value="openTasks">Open Tasks</option>
          </select>
        </label>
      </div>

      <div className="grid" role="list">
        {filtered.map(p => <ProjectCard key={p.id} project={p} />)}
        {filtered.length === 0 && <p>No projects found.</p>}
      </div>
    </section>
  )
}
