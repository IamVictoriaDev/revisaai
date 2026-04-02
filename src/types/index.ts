export interface Content {
  id: number
  title: string
  subject: string
  status: 'pendente' | 'revisado'
  notes: string
  createdAt: string
}

export interface Doubt {
  id: number
  question: string
  subject: string
  resolved: boolean
  createdAt: string
}

export interface Session {
  id: number
  subject: string
  duration: number
  date: string
  notes: string
}
