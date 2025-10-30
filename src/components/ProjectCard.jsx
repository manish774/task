import React from 'react'
import { Link } from 'react-router-dom'

export default function ProjectCard({ project }) {
  return (
    <article className="card" role="listitem">
      <h4><Link to={`/projects/${project.id}`}>{project.name}</Link></h4>
      <p>Owner: {project.owner}</p>
      <p>Status: {project.status}</p>
      <p>Last updated: {new Date(project.lastUpdated).toLocaleDateString()}</p>
      <p>Open tasks: {project.tasks?.length || 0}</p>
    </article>
  )
}
