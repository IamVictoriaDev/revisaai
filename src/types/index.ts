export interface Content {
  id: string
  title: string
  subject: string
  status: 'pendente' | 'revisado'
  notes: string
  createdAt: string
}

export interface Doubt {
  id: string
  question: string
  subject: string
  resolved: boolean
  createdAt: string
}

export interface Session {
  id: string
  subject: string
  duration: number
  date: string
  notes: string
}
