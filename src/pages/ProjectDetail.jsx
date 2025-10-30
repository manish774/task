import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import TaskList from '../components/TaskList'

function nextStatus(s) {
  if (s === 'Todo') return 'In Progress'
  if (s === 'In Progress') return 'Done'
  return 'Done'
}

export default function ProjectDetail() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/data/projects.json')
      .then(r => r.json())
      .then(d => {
        const p = (d.projects || []).find(x => x.id === id)
        setProject(p || null)
      })
  }, [id])

  function toggleTaskStatus(taskId) {
    setProject(prev => {
      const tasks = prev.tasks.map(t => t.id === taskId ? { ...t, status: nextStatus(t.status) } : t)
      return { ...prev, tasks }
    })
  }

  function addTask(e) {
    e.preventDefault()
    setError('')
    if (!newTitle.trim()) {
      setError('Title is required')
      return
    }
    const t = {
      id: 't' + Date.now(),
      title: newTitle.trim(),
      status: 'Todo',
      priority: 'Medium',
      assignee: '',
      dueDate: ''
    }
    setProject(prev => ({ ...prev, tasks: [...prev.tasks, t] }))
    setNewTitle('')
  }

  if (!project) return <p>Loading...</p>

  return (
    <section>
      <p><Link to="/projects">← Back to projects</Link></p>
      <h2>{project.name}</h2>
      <p>Owner: {project.owner} • Status: {project.status}</p>
      <p>Last updated: {new Date(project.lastUpdated).toLocaleString()}</p>

      <h3>Tasks</h3>
      <TaskList tasks={project.tasks} onToggle={toggleTaskStatus} />

      <form onSubmit={addTask} className="task-form" aria-label="Add task form">
        <label>
          Title
          <input value={newTitle} onChange={e => setNewTitle(e.target.value)} aria-required="true" />
        </label>
        <button type="submit">Add Task</button>
        {error && <p role="alert" className="error">{error}</p>}
      </form>
    </section>
  )
}
