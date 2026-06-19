// App.tsx: router setup only — no state, no UI logic.
// BrowserRouter enables client-side routing (URL changes without page reload).
// Route with element={<AppLayout />} wraps all pages with shared nav.
// Nested Routes render inside the layout's <Outlet />.
import { BrowserRouter, Routes, Route } from 'react-router'
import { AppLayout } from './layouts/AppLayout'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
