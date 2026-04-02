import { NavLink } from 'react-router-dom'

export function Navbar() {
  return (
    <aside className="w-52 min-h-screen bg-white border-r border-gray-100 flex flex-col py-6 px-3">
      <div className="px-3 mb-8 flex items-center gap-2.5">
  <img src="/favicon.svg" alt="logo" className="w-8 h-8" />
  <div>
    <h1 className="text-xl font-bold text-violet-600">RevisaAí</h1>
    <p className="text-xs text-gray-400 mt-0.5">seu caderno de estudos</p>
  </div>
</div>

      <nav className="flex flex-col gap-1">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isActive
                ? 'bg-violet-50 text-violet-700'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            }`
          }
        >
          <span>🏠</span> Início
        </NavLink>

        <NavLink
          to="/conteudos"
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isActive
                ? 'bg-violet-50 text-violet-700'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            }`
          }
        >
          <span>📖</span> Conteúdos
        </NavLink>

        <NavLink
          to="/duvidas"
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isActive
                ? 'bg-violet-50 text-violet-700'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            }`
          }
        >
          <span>❓</span> Dúvidas
        </NavLink>

        <NavLink
          to="/sessoes"
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isActive
                ? 'bg-violet-50 text-violet-700'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            }`
          }
        >
          <span>⏱️</span> Sessões
        </NavLink>
<NavLink
  to="/sobre"
  className={({ isActive }) =>
    `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
      isActive
        ? 'bg-violet-50 text-violet-700'
        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
    }`
  }
>
  <span>👤</span> Sobre
</NavLink>

      </nav>
      <div className="px-6 mt-auto pt-6">
  <p className="text-xs text-gray-300">v1.0</p>
</div>
    </aside>
  )
}
