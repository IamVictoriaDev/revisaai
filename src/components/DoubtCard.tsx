import { Doubt } from '../types'

interface Props {
  doubt: Doubt
  onResolve: (id: string) => void
  onDelete: (id: string) => void
  onExplain: (question: string) => void
}

export function DoubtCard({ doubt, onResolve, onDelete, onExplain }: Props) {
  return (
    <div
      className={`bg-white rounded-2xl border p-4 shadow-sm ${
        doubt.resolved ? 'border-gray-100 opacity-60' : 'border-rose-100'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="text-sm text-gray-800 font-medium">{doubt.question}</p>
          <p className="text-xs text-gray-400 mt-0.5">{doubt.subject}</p>
        </div>
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${
            doubt.resolved
              ? 'bg-gray-100 text-gray-400'
              : 'bg-rose-50 text-rose-600'
          }`}
        >
          {doubt.resolved ? 'resolvida' : 'em aberto'}
        </span>
      </div>

      {!doubt.resolved && (
        <div className="flex gap-2 mt-3 flex-wrap">
          <button
            onClick={() => onResolve(doubt.id)}
            className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Marcar resolvida
          </button>

          <button
            onClick={() => onExplain(doubt.question)}
            className="text-xs px-3 py-1.5 rounded-lg bg-violet-50 text-violet-600 hover:bg-violet-100 transition-colors"
          >
            ✨ Me explica
          </button>

          <button
            onClick={() => onDelete(doubt.id)}
            className="text-xs px-3 py-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            Excluir
          </button>
        </div>
      )}
    </div>
  )
}
