// App.tsx: router setup + context providers.
// ThemeProvider wraps everything so any component can call useTheme() — no prop drilling.
import { BrowserRouter, Routes, Route } from 'react-router'
import { AppLayout } from './layouts/AppLayout'
import { HomePage } from './pages/HomePage'
import { TaskDetailsPage } from './pages/TaskDetailsPage'
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
            <Route path="tasks/:taskId" element={<TaskDetailsPage />} />
            <Route path="about" element={<AboutPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
