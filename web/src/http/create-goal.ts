import { api } from '../lib/api'

type RequestData = {
  title: string
  desiredWeeklyFrequency: number
}

export async function createGoal(data: RequestData) {
  await api.post('/goals', data)
}
