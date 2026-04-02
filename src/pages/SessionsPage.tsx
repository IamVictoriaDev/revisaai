import { useEffect, useState } from 'react'
import { Session } from '../types'
import { getSessions, createSession, updateSession, deleteSession } from '../services/api'

export function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [subject, setSubject] = useState('')
  const [duration, setDuration] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [notes, setNotes] = useState('')
  const [formError, setFormError] = useState('')
  const [saving, setSaving] = useState(false)

  const [editingId, setEditingId] = useState<number | null>(null)
  const [editDuration, setEditDuration] = useState('')
  const [editNotes, setEditNotes] = useState('')

  useEffect(() => {
    getSessions()
      .then(setSessions)
      .catch(() => setError('Não consegui carregar as sessões. O json-server tá rodando?'))
      .finally(() => setLoading(false))
  }, [])

  const totalMinutos = sessions.reduce((acc, s) => acc + s.duration, 0)
  const horas = Math.floor(totalMinutos / 60)
  const minutos = totalMinutos % 60

  async function handleCreate() {
    if (!subject.trim() || !duration || !date) {
      setFormError('Preencha matéria, duração e data.')
      return
    }
    const dur = Number(duration)
    if (isNaN(dur) || dur <= 0) {
      setFormError('A duração precisa ser um número maior que zero.')
      return
    }
    setFormError('')
    setSaving(true)
    try {
      const nova = await createSession({
        subject: subject.trim(),
        duration: dur,
        date,
        notes: notes.trim(),
      })
      setSessions((prev) => [...prev, nova])
      setSubject('')
      setDuration('')
      setNotes('')
    } catch {
      setFormError('Não salvou. Verifica se o servidor tá rodando e tenta de novo.')
    } finally {
      setSaving(false)
    }
  }

  async function handleEdit(id: number) {
    const dur = Number(editDuration)
    if (isNaN(dur) || dur <= 0) {
      alert('Duração inválida.')
      return
    }
    try {
      const atualizada = await updateSession(id, {
        duration: dur,
        notes: editNotes.trim(),
      })
      setSessions((prev) => prev.map((s) => (s.id === id ? atualizada : s)))
      setEditingId(null)
    } catch {
      alert('Não consegui editar. Tenta de novo.')
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Remover essa sessão?')) return
    try {
      await deleteSession(id)
      setSessions((prev) => prev.filter((s) => s.id !== id))
    } catch {
      alert('Não consegui deletar. Tenta de novo.')
    }
  }

  function startEdit(s: Session) {
    setEditingId(s.id)
    setEditDuration(String(s.duration))
    setEditNotes(s.notes)
  }

  // ordena por data mais recente primeiro
  const sorted = [...sessions].sort((a, b) => b.date.localeCompare(a.date))

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
      <h1 className="text-xl font-bold text-gray-800 mb-1">Sessões de estudo</h1>
      <p className="text-sm text-gray-400 mb-6">quanto tempo você dedicou a cada matéria</p>

      <div className="bg-white rounded-2xl border border-violet-100 p-5 shadow-sm mb-6 inline-block min-w-48">
        <p className="text-xs text-gray-400 mb-1">tempo total</p>
        <p className="text-3xl font-bold text-violet-500">
          {horas}h{minutos > 0 ? ` ${minutos}m` : ''}
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Registrar sessão</h2>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-xs text-gray-500 block mb-1" htmlFor="s-subject">
              Matéria *
            </label>
            <input
              id="s-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="ex: Cálculo"
              className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-violet-300"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1" htmlFor="s-duration">
              Duração em minutos *
            </label>
            <input
              id="s-duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="ex: 90"
              min="1"
              className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-violet-300"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-xs text-gray-500 block mb-1" htmlFor="s-date">
              Data *
            </label>
            <input
              id="s-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-violet-300"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1" htmlFor="s-notes">
              Observação (opcional)
            </label>
            <input
              id="s-notes"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="ex: revi integrais"
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
          {saving ? 'Salvando...' : 'Registrar'}
        </button>
      </div>

      <h2 className="text-sm font-semibold text-gray-700 mb-3">
        Histórico ({sessions.length})
      </h2>

      {sessions.length === 0 ? (
        <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-8 text-center">
          <p className="text-gray-400 text-sm">Nenhuma sessão ainda. Registra a primeira!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {sorted.map((s) => (
            <div key={s.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              {editingId === s.id ? (
                <div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Duração (min)</label>
                      <input
                        type="number"
                        value={editDuration}
                        onChange={(e) => setEditDuration(e.target.value)}
                        className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-violet-300"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Observação</label>
                      <input
                        type="text"
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-violet-300"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(s.id)}
                      className="text-xs px-3 py-1.5 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
                    >
                      Salvar
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-xs px-3 py-1.5 border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-800">{s.subject}</span>
                      <span className="text-xs px-2 py-0.5 bg-violet-50 text-violet-600 rounded-full">
                        {s.duration} min
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {s.date}{s.notes ? ` · ${s.notes}` : ''}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(s)}
                      className="text-xs px-3 py-1.5 border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="text-xs px-3 py-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
