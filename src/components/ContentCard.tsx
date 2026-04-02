import { useState } from 'react'
import { Content } from '../types'

interface Props {
  content: Content
  onToggleStatus: (id: number, status: 'pendente' | 'revisado') => void
  onDelete: (id: number) => void
  onGenerateQuestions: (title: string) => void
}

export function ContentCard({ content, onToggleStatus, onDelete, onGenerateQuestions }: Props) {
  const [confirmDelete, setConfirmDelete] = useState(false)

  function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true)
      return
    }
    onDelete(content.id)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-medium text-gray-800 text-sm">{content.title}</h3>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                content.status === 'revisado'
                  ? 'bg-green-50 text-green-700'
                  : 'bg-yellow-50 text-yellow-700'
              }`}
            >
              {content.status}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">{content.subject}</p>
          {content.notes && (
            <p className="text-xs text-gray-500 mt-2 italic">"{content.notes}"</p>
          )}
        </div>
      </div>

      <div className="flex gap-2 mt-3 flex-wrap">
        <button
          onClick={() =>
            onToggleStatus(
              content.id,
              content.status === 'revisado' ? 'pendente' : 'revisado'
            )
          }
          className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          {content.status === 'revisado' ? 'Marcar pendente' : 'Marcar revisado'}
        </button>

        <button
          onClick={() => onGenerateQuestions(content.notes)}
          className="text-xs px-3 py-1.5 rounded-lg bg-violet-50 text-violet-600 hover:bg-violet-100 transition-colors"
        >
          ✨ Perguntas de revisão
        </button>

        <button
          onClick={handleDelete}
          className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
            confirmDelete
              ? 'bg-red-100 text-red-600 hover:bg-red-200'
              : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
          }`}
        >
          {confirmDelete ? 'Confirmar exclusão' : 'Excluir'}
        </button>
      </div>
    </div>
  )
}
