import { api } from '../lib/api'

type PendingGoalsResponse = {
  pendingGoals: {
    id: string
    title: string
    desiredWeeklyFrequency: number
    completionCount: number
  }[]
}

export async function getPendingGoals(): Promise<PendingGoalsResponse> {
  const res = await api.get('/pending-goals')
  return res.data
}
