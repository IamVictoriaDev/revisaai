import { useEffect, useState, useMemo } from 'react'
import { Content, Doubt, Session } from '../types'
import { getContents, getDoubts, getSessions } from '../services/api'

export function Dashboard() {
  const [contents, setContents] = useState<Content[]>([])
  const [doubts, setDoubts] = useState<Doubt[]>([])
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // carrego um por vez porque fica mais fácil de entender o que tá acontecendo
    async function carregarDados() {
      try {
        const c = await getContents()
        setContents(c)

        const d = await getDoubts()
        setDoubts(d)

        const s = await getSessions()
        setSessions(s)
      } catch {
        setError('Não consegui carregar os dados. O json-server tá rodando na porta 3001?')
      } finally {
        setLoading(false)
      }
    }

    carregarDados()
  }, [])

  // useMemo pra não recalcular esses valores toda vez que o componente re-renderizar
  const pendentes = useMemo(() => {
    return contents.filter((c) => c.status === 'pendente').length
  }, [contents])

  const duvidasAbertas = useMemo(() => {
    return doubts.filter((d) => !d.resolved).length
  }, [doubts])

  const totalMinutos = useMemo(() => {
    return sessions.reduce((acc, s) => acc + s.duration, 0)
  }, [sessions])

  const horas = Math.floor(totalMinutos / 60)
  const minutos = totalMinutos % 60

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400 text-sm">Carregando...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
        <p className="text-red-600 text-sm font-medium">Algo deu errado</p>
        <p className="text-red-400 text-sm mt-1">{error}</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 mb-1">Seu resumo</h1>
      <p className="text-sm text-gray-400 mb-6">o que tá rolando nos seus estudos</p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-yellow-100 p-5 shadow-sm">
          <p className="text-xs text-gray-400 mb-1">falta revisar</p>
          <p className="text-3xl font-bold text-yellow-500">{pendentes}</p>
          <p className="text-xs text-gray-400 mt-1">
            {pendentes === 0 ? 'tudo revisado 🎉' : 'conteúdo(s) pendente(s)'}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-rose-100 p-5 shadow-sm">
          <p className="text-xs text-gray-400 mb-1">dúvidas em aberto</p>
          <p className="text-3xl font-bold text-rose-400">{duvidasAbertas}</p>
          <p className="text-xs text-gray-400 mt-1">
            {duvidasAbertas === 0 ? 'nenhuma pendente' : 'ainda sem resposta'}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-violet-100 p-5 shadow-sm">
          <p className="text-xs text-gray-400 mb-1">tempo estudado</p>
          <p className="text-3xl font-bold text-violet-500">
            {horas}h{minutos > 0 ? ` ${minutos}m` : ''}
          </p>
          <p className="text-xs text-gray-400 mt-1">{sessions.length} sessão(ões)</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          {/* depois quero colocar filtro por matéria aqui */}
          <h2 className="text-sm font-semibold text-gray-700 mb-3">O que falta revisar</h2>
          {contents.filter((c) => c.status === 'pendente').length === 0 ? (
            <div className="bg-green-50 rounded-2xl p-4 text-center">
              <p className="text-sm text-green-600">Nada pendente, boa! 🎉</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {/* por enquanto mostra os 4 primeiros */}
              {contents
                .filter((c) => c.status === 'pendente')
                .slice(0, 4)
                .map((c) => (
                  <div
                    key={c.id}
                    className="bg-white rounded-xl border border-gray-100 px-4 py-3 text-sm text-gray-700"
                  >
                    <span className="font-medium">{c.title}</span>
                    <span className="text-gray-400 text-xs ml-2">{c.subject}</span>
                  </div>
                ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Dúvidas recentes</h2>
          {doubts.filter((d) => !d.resolved).length === 0 ? (
            <div className="bg-green-50 rounded-2xl p-4 text-center">
              <p className="text-sm text-green-600">Sem dúvidas em aberto!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {doubts
                .filter((d) => !d.resolved)
                .slice(0, 4)
                .map((d) => (
                  <div
                    key={d.id}
                    className="bg-white rounded-xl border border-rose-100 px-4 py-3 text-sm text-gray-700"
                  >
                    <p className="truncate">{d.question}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{d.subject}</p>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
  {/* barra de progresso */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-700">evolução — o que já aprendi</h2>
          <span className="text-xs bg-violet-50 text-violet-600 px-2 py-0.5 rounded-full font-medium">
            {contents.length === 0
              ? '0%'
              : `${Math.round(((contents.length - pendentes) / contents.length) * 100)}% revisado`}
          </span>
        </div>
        <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-violet-500 h-2 rounded-full transition-all"
            style={{
              width: contents.length === 0
                ? '0%'
                : `${Math.round(((contents.length - pendentes) / contents.length) * 100)}%`
            }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-400">{contents.length - pendentes} revisado(s)</span>
          <span className="text-xs text-gray-400">{pendentes} pendente(s)</span>
        </div>
      </div>

      {/* próximos passos */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm mt-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-1">próximos passos</h2>
        <p className="text-xs text-gray-400 mb-4">com base nos seus pendentes, tenta uma dessas hoje</p>
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xl mb-1">📺</p>
            <p className="text-xs font-medium text-gray-700">rever vídeo</p>
            <p className="text-xs text-gray-400 mt-0.5 leading-tight">procura uma aula sobre o pendente</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xl mb-1">📚</p>
            <p className="text-xs font-medium text-gray-700">ler o material</p>
            <p className="text-xs text-gray-400 mt-0.5 leading-tight">abre o livro ou slide e relê</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xl mb-1">✏️</p>
            <p className="text-xs font-medium text-gray-700">praticar</p>
            <p className="text-xs text-gray-400 mt-0.5 leading-tight">faz exercícios ou um exemplo</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xl mb-1">📝</p>
            <p className="text-xs font-medium text-gray-700">fazer prova</p>
            <p className="text-xs text-gray-400 mt-0.5 leading-tight">testa o que aprendeu com questões</p>
          </div>
        </div>
      </div>
    </div>
  )
}
