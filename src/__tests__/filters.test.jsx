import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Projects from '../pages/Projects'
import '@testing-library/jest-dom'

const mockData = {
  projects: [
    { id: '1', name: 'Alpha', owner: 'A', status: 'Active', lastUpdated: '2025-10-01', tasks: [] },
    { id: '2', name: 'Beta', owner: 'B', status: 'Paused', lastUpdated: '2025-09-01', tasks: [] }
  ]
}

beforeEach(() => {
  global.fetch = vi.fn(() => Promise.resolve({ json: () => Promise.resolve(mockData) }))
})

it('filters projects by status', async () => {
  render(<MemoryRouter><Projects /></MemoryRouter>)
  await waitFor(() => expect(global.fetch).toHaveBeenCalled())
  // by default both present
  expect(await screen.findByText('Alpha')).toBeInTheDocument()
  expect(await screen.findByText('Beta')).toBeInTheDocument()

  fireEvent.change(screen.getByLabelText(/Status/i), { target: { value: 'Active' }})
  expect(await screen.findByText('Alpha')).toBeInTheDocument()
  expect(screen.queryByText('Beta')).toBeNull()
})
