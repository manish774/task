import React from 'react'

export default function TaskList({ tasks = [], onToggle = () => {} }) {
  return (
    <ul className="tasks" aria-live="polite">
      {tasks.map(t => (
        <li key={t.id} className="task">
          <div>
            <strong>{t.title}</strong>
            <div className="meta">{t.priority} • {t.assignee || 'Unassigned'} • due {t.dueDate || '—'}</div>
          </div>
          <div className="actions">
            <span>{t.status}</span>
            <button onClick={() => onToggle(t.id)} aria-label={`Advance status for ${t.title}`}>Next</button>
          </div>
        </li>
      ))}
    </ul>
  )
}
