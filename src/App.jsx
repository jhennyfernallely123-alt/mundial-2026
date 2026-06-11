import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { WorldCupProvider } from './context/WorldCupContext'
import TimezoneSelector from './components/TimezoneSelector'
import Home from './pages/Home'
import Groups from './pages/Groups'
import GroupDetail from './pages/GroupDetail'
import Calendar from './pages/Calendar'
import Knockout from './pages/Knockout'
import Teams from './pages/Teams'
import TeamDetail from './pages/TeamDetail'

export default function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <WorldCupProvider>
      <div className="min-h-screen bg-gray-50 max-w-lg mx-auto relative">
        {/* Header with timezone */}
        <header className="sticky top-0 z-40 bg-gradient-to-r from-blue-900 to-blue-800 text-white px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isHome ? (
              <>
                <span className="text-lg">🏆</span>
                <span className="font-bold text-sm">Mundial 2026</span>
              </>
            ) : (
              <Link to="/" className="flex items-center gap-2 hover:text-yellow-300 transition-colors">
                <span className="text-lg">⬅</span>
                <span className="font-bold text-sm">Inicio</span>
              </Link>
            )}
          </div>
          <TimezoneSelector />
        </header>

        {/* Main content */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/grupos" element={<Groups />} />
          <Route path="/grupos/:letra" element={<GroupDetail />} />
          <Route path="/calendario" element={<Calendar />} />
          <Route path="/eliminatorias" element={<Knockout />} />
          <Route path="/equipos" element={<Teams />} />
          <Route path="/equipos/:nombre" element={<TeamDetail />} />
        </Routes>
      </div>
    </WorldCupProvider>
  )
}
