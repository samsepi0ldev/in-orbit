import { api } from '../lib/api'

export type Summary = {
  summary: {
    completed: number
    total: number
    goalsPerDay: Record<
      string,
      {
        id: string
        title: string
        createdAt: string
      }[]
    >
  }
}

export async function getSummary(): Promise<Summary> {
  const response = await api.get('/summary')
  return response.data
}
