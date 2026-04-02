export function SobrePage() {
  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 mb-1">Sobre mim</h1>
      <p className="text-sm text-gray-400 mb-6">quem fez esse projeto e por quê</p>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm mb-4">
        <img
  src="https://github.com/IamVictoriaDev.png"
  alt="Victoria Dev"
  className="w-12 h-12 rounded-full object-cover mb-4"
/>
        <p className="text-base font-semibold text-gray-800">Victoria Dev</p>
        <p className="text-sm text-gray-400 mt-0.5 mb-3">estudante de Engenharia de Software</p>
        <p className="text-sm text-gray-600 leading-relaxed">
         O RevisaAí nasceu de um problema real: estudar, mas não revisar e acabar esquecendo tudo. 
A ideia é simples  ajudar a manter consistência, organizar dúvidas e transformar estudo em algo contínuo.
        </p>
      </div>

      <h2 className="text-sm font-semibold text-gray-700 mb-3">onde me encontrar</h2>
      <div className="grid grid-cols-2 gap-3 mb-6">
        <a
          href="https://github.com/IamVictoriaDev"
          target="_blank"
          rel="noreferrer"
          className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-center gap-3 hover:border-gray-200 transition-colors"
        >
          <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-lg">
            🐙
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">GitHub</p>
            <p className="text-xs text-violet-500">https://github.com/IamVictoriaDev</p>
          </div>
        </a>
        <a
          href="https://www.linkedin.com/in/victoriaingrid-tech/"
          target="_blank"
          rel="noreferrer"
          className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-center gap-3 hover:border-gray-200 transition-colors"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-sm font-bold text-blue-600">
            in
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">LinkedIn</p>
            <p className="text-xs text-violet-500">https://www.linkedin.com/in/victoriaingrid-tech/</p>
          </div>
        </a>
      </div>

      <h2 className="text-sm font-semibold text-gray-700 mb-3">tecnologias usadas</h2>
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <p className="text-sm font-medium text-gray-800 mb-1">RevisaAí — organizador de estudos</p>
        <p className="text-xs text-gray-500 leading-relaxed mb-3">
          app pra registrar conteúdos, revisões, dúvidas e sessões de estudo, com IA como apoio.
        </p>
        <div className="flex flex-wrap gap-2">
          {['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'IA'].map((t) => (
            <span key={t} className="text-xs bg-violet-50 text-violet-600 px-3 py-1 rounded-full">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}