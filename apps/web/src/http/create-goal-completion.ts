import { api } from '../lib/api'

export async function createGoalCompletion(
  goalId: string
): Promise<{ goalCompletionId: string }> {
  const response = await api.post('/completions', { goalId })

  return response.data
}
