import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ProjectDetail from '../pages/ProjectDetail'
import '@testing-library/jest-dom'

const mockData = {
  projects: [
    { id: '1', name: 'Alpha', owner: 'A', status: 'Active', lastUpdated: '2025-10-01', tasks: [] }
  ]
}

beforeEach(() => {
  global.fetch = vi.fn(() => Promise.resolve({ json: () => Promise.resolve(mockData) }))
})

it('shows validation error when adding empty task', async () => {
  render(
    <MemoryRouter initialEntries={['/projects/1']}>
      <Routes>
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
    </MemoryRouter>
  )
  await waitFor(() => expect(global.fetch).toHaveBeenCalled())
  fireEvent.click(screen.getByText(/Add Task/i))
  expect(await screen.findByRole('alert')).toHaveTextContent(/Title is required/i)
})
