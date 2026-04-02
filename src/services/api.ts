import { Content, Doubt, Session } from '../types'

const BASE = 'http://localhost:3001'

// conteúdos
export async function getContents(): Promise<Content[]> {
  const res = await fetch(`${BASE}/contents`)
  if (!res.ok) throw new Error('erro ao buscar conteúdos')
  return res.json()
}

export async function createContent(data: {
  title: string
  subject: string
  status: 'pendente' | 'revisado'
  notes: string
  createdAt: string
}): Promise<Content> {
  const res = await fetch(`${BASE}/contents`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('erro ao criar conteúdo')
  return res.json()
}

export async function updateContent(id: number, data: {
  status?: 'pendente' | 'revisado'
  notes?: string
  title?: string
  subject?: string
}): Promise<Content> {
  const res = await fetch(`${BASE}/contents/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('erro ao atualizar conteúdo')
  return res.json()
}

export async function deleteContent(id: number): Promise<void> {
  const res = await fetch(`${BASE}/contents/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('erro ao deletar conteúdo')
}

// dúvidas
export async function getDoubts(): Promise<Doubt[]> {
  const res = await fetch(`${BASE}/doubts`)
  if (!res.ok) throw new Error('erro ao buscar dúvidas')
  return res.json()
}

export async function createDoubt(data: {
  question: string
  subject: string
  resolved: boolean
  createdAt: string
}): Promise<Doubt> {
  const res = await fetch(`${BASE}/doubts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('erro ao criar dúvida')
  return res.json()
}

export async function updateDoubt(id: number, data: {
  resolved?: boolean
  question?: string
  subject?: string
}): Promise<Doubt> {
  const res = await fetch(`${BASE}/doubts/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('erro ao atualizar dúvida')
  return res.json()
}

export async function deleteDoubt(id: number): Promise<void> {
  const res = await fetch(`${BASE}/doubts/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('erro ao deletar dúvida')
}

// sessões
export async function getSessions(): Promise<Session[]> {
  const res = await fetch(`${BASE}/sessions`)
  if (!res.ok) throw new Error('erro ao buscar sessões')
  return res.json()
}

export async function createSession(data: {
  subject: string
  duration: number
  date: string
  notes: string
}): Promise<Session> {
  const res = await fetch(`${BASE}/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('erro ao criar sessão')
  return res.json()
}

export async function updateSession(id: number, data: {
  subject?: string
  duration?: number
  date?: string
  notes?: string
}): Promise<Session> {
  const res = await fetch(`${BASE}/sessions/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('erro ao atualizar sessão')
  return res.json()
}

export async function deleteSession(id: number): Promise<void> {
  const res = await fetch(`${BASE}/sessions/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('erro ao deletar sessão')
}

// IA — chama o backend separado
const AI_BASE = 'http://localhost:3002'

export async function gerarPerguntas(titulo: string): Promise<string[]> {
  const res = await fetch(`${AI_BASE}/ai/perguntas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo }),
  })
  if (!res.ok) throw new Error('erro ao gerar perguntas')
  const data = await res.json()
  return data.perguntas
}

export async function explicarDuvida(duvida: string): Promise<string> {
  const res = await fetch(`${AI_BASE}/ai/explicar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ duvida }),
  })
  if (!res.ok) throw new Error('erro ao explicar dúvida')
  const data = await res.json()
  return data.explicacao
}
