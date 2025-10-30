# Projects Dashboard (Vite + React)

Setup

1. npm install
2. npm run dev
3. npm run test

Features implemented (MVP)

- Routing: /, /projects, /projects/:id
- Projects list with debounced search, status filter, sort
- Project detail showing tasks, toggle status, add task (title required)
- Dark/light theme toggle persisted in localStorage
- Basic accessibility: labeled inputs, visible focus outlines
- Two tests for filtering and form validation (Vitest + RTL)

Trade-offs / Notes

- No backend; mock data served from public/data/projects.json
- State is in-memory; page refresh resets task additions
- Styling is simple CSS tokens rather than full Tailwind for speed
