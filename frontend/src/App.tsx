// App.tsx: router setup + context providers.
// ThemeProvider wraps everything so any component can call useTheme() — no prop drilling.
import { BrowserRouter, Routes, Route } from 'react-router'
import { AppLayout } from './layouts/AppLayout'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    // ThemeProvider is the useContext "source" — it owns darkMode state and shares it
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
