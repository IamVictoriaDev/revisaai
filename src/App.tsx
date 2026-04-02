import { SobrePage } from './pages/SobrePage.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar.tsx'
import { Dashboard } from './pages/Dashboard.tsx'
import { ContentsPage } from './pages/ContentsPage.tsx'
import { DoubtsPage } from './pages/DoubtsPage.tsx'
import { SessionsPage } from './pages/SessionsPage.tsx'

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-1 p-8 overflow-y-auto">
          <Routes>
            <Route path="/sobre" element={<SobrePage />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/conteudos" element={<ContentsPage />} />
            <Route path="/duvidas" element={<DoubtsPage />} />
            <Route path="/sessoes" element={<SessionsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
