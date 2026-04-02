import { useEffect, useState } from 'react'
import { Doubt } from '../types'
import { getDoubts, createDoubt, updateDoubt, deleteDoubt, explicarDuvida } from '../services/api'
import { DoubtCard } from '../components/DoubtCard'
import { AiModal } from '../components/AiModal'

export function DoubtsPage() {
  const [doubts, setDoubts] = useState<Doubt[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [question, setQuestion] = useState('')
  const [subject, setSubject] = useState('')
  const [formError, setFormError] = useState('')
  const [saving, setSaving] = useState(false)

  const [aiModal, setAiModal] = useState<{
    open: boolean
    question: string
    explicacao: string
    loading: boolean
    erro: string
  }>({ open: false, question: '', explicacao: '', loading: false, erro: '' })

  useEffect(() => {
    getDoubts()
      .then(setDoubts)
      .catch(() => setError('Não carregou. O json-server tá rodando?'))
      .finally(() => setLoading(false))
  }, [])

  async function handleCreate() {
    if (!question.trim() || !subject.trim()) {
      setFormError('Preenche a dúvida e a matéria.')
      return
    }
    setFormError('')
    setSaving(true)
    try {
      const nova = await createDoubt({
        question: question.trim(),
        subject: subject.trim(),
        resolved: false,
        createdAt: new Date().toISOString().split('T')[0],
      })
      setDoubts((prev) => [...prev, nova])
      setQuestion('')
      setSubject('')
    } catch {
      setFormError('Não consegui salvar, tenta de novo.')
    } finally {
      setSaving(false)
    }
  }

  async function handleResolve(id: number) {
    try {
      const atualizada = await updateDoubt(id, { resolved: true })
      setDoubts((prev) => prev.map((d) => (d.id === id ? atualizada : d)))
    } catch {
      alert('Não consegui marcar como resolvida.')
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteDoubt(id)
      setDoubts((prev) => prev.filter((d) => d.id !== id))
    } catch {
      alert('Não consegui deletar.')
    }
  }

  async function handleExplain(q: string) {
    setAiModal({ open: true, question: q, explicacao: '', loading: true, erro: '' })
    try {
      const explicacao = await explicarDuvida(q)
      setAiModal((prev) => ({ ...prev, explicacao, loading: false }))
    } catch {
      setAiModal((prev) => ({
        ...prev,
        loading: false,
        erro: 'A IA não respondeu agora. Verifica se o backend da IA no Render está online.',
      }))
    }
  }

  const abertas = doubts.filter((d) => !d.resolved)
  const resolvidas = doubts.filter((d) => d.resolved)

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
      <h1 className="text-xl font-bold text-gray-800 mb-1">Suas dúvidas</h1>
      <p className="text-sm text-gray-400 mb-6">anota quando aparecer, resolve quando puder</p>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Nova dúvida</h2>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-xs text-gray-500 block mb-1" htmlFor="d-question">
              A dúvida *
            </label>
            <input
              id="d-question"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="ex: O que é ponteiro duplo?"
              className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-violet-300"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1" htmlFor="d-subject">
              Matéria *
            </label>
            <input
              id="d-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="ex: Programação"
              className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-violet-300"
            />
          </div>
        </div>

        {formError && <p className="text-xs text-red-500 mb-2">{formError}</p>}

        <button
          onClick={handleCreate}
          disabled={saving}
          className="text-sm px-4 py-2 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors disabled:opacity-50"
        >
          {saving ? 'Salvando...' : 'Anotar'}
        </button>
      </div>

      <h2 className="text-sm font-semibold text-gray-700 mb-3">Em aberto ({abertas.length})</h2>

      {abertas.length === 0 ? (
        <div className="bg-green-50 border border-dashed border-green-200 rounded-2xl p-6 text-center mb-6">
          <p className="text-green-600 text-sm">Nenhuma dúvida em aberto!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 mb-6">
          {abertas.map((d) => (
            <DoubtCard
              key={d.id}
              doubt={d}
              onResolve={handleResolve}
              onDelete={handleDelete}
              onExplain={handleExplain}
            />
          ))}
        </div>
      )}

      {resolvidas.length > 0 && (
        <>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            Resolvidas ({resolvidas.length})
          </h2>
          <div className="flex flex-col gap-3">
            {resolvidas.map((d) => (
              <DoubtCard
                key={d.id}
                doubt={d}
                onResolve={handleResolve}
                onDelete={handleDelete}
                onExplain={handleExplain}
              />
            ))}
          </div>
        </>
      )}

      {aiModal.open && (
        <AiModal
          title="Explicação"
          onClose={() => setAiModal({ open: false, question: '', explicacao: '', loading: false, erro: '' })}
        >
          <p className="text-xs text-gray-400 mb-3 italic">"{aiModal.question}"</p>
          {aiModal.loading && (
            <p className="text-sm text-gray-400">Gerando explicação...</p>
          )}
          {aiModal.erro && (
            <p className="text-sm text-amber-600 bg-amber-50 rounded-xl px-4 py-3">{aiModal.erro}</p>
          )}
          {!aiModal.loading && !aiModal.erro && (
            <div className="bg-violet-50 rounded-xl px-4 py-3 text-sm text-violet-800 leading-relaxed">
              {aiModal.explicacao}
            </div>
          )}
        </AiModal>
      )}
    </div>
  )
}
