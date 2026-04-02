import { useEffect, useState } from 'react'
import { Content } from '../types'
import { getContents, createContent, updateContent, deleteContent, gerarPerguntas } from '../services/api'
import { ContentCard } from '../components/ContentCard'
import { AiModal } from '../components/AiModal'

export function ContentsPage() {
  const [contents, setContents] = useState<Content[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [notes, setNotes] = useState('')
  const [formError, setFormError] = useState('')
  const [saving, setSaving] = useState(false)

  const [aiModal, setAiModal] = useState<{
    open: boolean
    title: string
    perguntas: string[]
    loading: boolean
    erro: string
  }>({ open: false, title: '', perguntas: [], loading: false, erro: '' })

  useEffect(() => {
    getContents()
      .then(setContents)
      .catch(() => setError('Não carregou. O servidor tá rodando?'))
      .finally(() => setLoading(false))
  }, [])

  async function handleCreate() {
    if (!title.trim() || !subject.trim() || !notes.trim()) {
      setFormError('Título, matéria e resumo do conteúdo são obrigatórios.')
      return
    }
    setFormError('')
    setSaving(true)
    try {
      const novo = await createContent({
        title: title.trim(),
        subject: subject.trim(),
        notes: notes.trim(),
        status: 'pendente',
        createdAt: new Date().toISOString().split('T')[0],
      })
      setContents((prev) => [...prev, novo])
      setTitle('')
      setSubject('')
      setNotes('')
    } catch {
      setFormError('Não consegui salvar, tenta de novo.')
    } finally {
      setSaving(false)
    }
  }

  async function handleToggleStatus(id: string, status: 'pendente' | 'revisado') {
    try {
      const atualizado = await updateContent(id, { status })
      setContents((prev) => prev.map((c) => (c.id === id ? atualizado : c)))
    } catch {
      alert('Não consegui atualizar o status.')
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteContent(id)
      setContents((prev) => prev.filter((c) => c.id !== id))
    } catch {
      alert('Não consegui deletar.')
    }
  }

  async function handleGenerateQuestions(notes: string) {
    setAiModal({ open: true, title: 'Perguntas de revisão', perguntas: [], loading: true, erro: '' })
    try {
      const perguntas = await gerarPerguntas(notes)
      setAiModal((prev) => ({ ...prev, perguntas, loading: false }))
    } catch {
      setAiModal((prev) => ({
        ...prev,
        loading: false,
        erro: 'A IA não respondeu agora. Verifica se o backend da IA no Render está online.',
      }))
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400 text-sm">Carregando...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
        <p className="text-red-600 text-sm font-medium">Algo deu errado</p>
        <p className="text-red-400 text-sm mt-1">{error}</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 mb-1">O que você estudou</h1>
      <p className="text-sm text-gray-400 mb-6">adicione e marque o que já revisou</p>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Adicionar conteúdo</h2>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-xs text-gray-500 block mb-1" htmlFor="c-title">
              Título *
            </label>
            <input
              id="c-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ex: Ponteiros em C"
              className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-violet-300"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1" htmlFor="c-subject">
              Matéria *
            </label>
            <input
              id="c-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="ex: Programação"
              className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-violet-300"
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="text-xs text-gray-500 block mb-1" htmlFor="c-notes">
            Resumo do conteúdo *
          </label>
          <textarea
            id="c-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="escreva o que você estudou, conceitos principais, o que achou difícil..."
            rows={3}
            className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-violet-300 resize-none"
          />
        </div>

        {formError && <p className="text-xs text-red-500 mb-2">{formError}</p>}

        <button
          onClick={handleCreate}
          disabled={saving}
          className="text-sm px-4 py-2 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors disabled:opacity-50"
        >
          {saving ? 'Salvando...' : 'Adicionar'}
        </button>
      </div>

      <h2 className="text-sm font-semibold text-gray-700 mb-3">
        Seus conteúdos ({contents.length})
      </h2>

      {contents.length === 0 ? (
        <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-8 text-center">
          <p className="text-gray-400 text-sm">Nenhum conteúdo ainda. Adiciona o primeiro!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {contents.map((c) => (
            <ContentCard
              key={c.id}
              content={c}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDelete}
              onGenerateQuestions={handleGenerateQuestions}
            />
          ))}
        </div>
      )}

      {aiModal.open && (
        <AiModal
          title={aiModal.title}
          onClose={() => setAiModal({ open: false, title: '', perguntas: [], loading: false, erro: '' })}
        >
          {aiModal.loading && (
            <p className="text-sm text-gray-400">Gerando perguntas...</p>
          )}
          {aiModal.erro && (
            <p className="text-sm text-amber-600 bg-amber-50 rounded-xl px-4 py-3">{aiModal.erro}</p>
          )}
          {!aiModal.loading && !aiModal.erro && (
            <div className="flex flex-col gap-2">
              {aiModal.perguntas.map((p, i) => (
                <div key={i} className="bg-violet-50 rounded-xl px-4 py-3 text-sm text-violet-800">
                  {p}
                </div>
              ))}
            </div>
          )}
        </AiModal>
      )}
    </div>
  )
}