import { DbCreateGoalCompletion } from '@/data/usecases'
import { DrizzleGoalRepository } from '@/infra/drizzle-goal-repository'

export const makeCreateGoalCompletion = (): DbCreateGoalCompletion => {
  const repository = new DrizzleGoalRepository()
  return new DbCreateGoalCompletion(repository)
}
