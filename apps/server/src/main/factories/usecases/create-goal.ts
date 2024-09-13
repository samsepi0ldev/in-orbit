import { DbCreateGoal } from '@/data/usecases'
import { DrizzleGoalRepository } from '@/infra/drizzle-goal-repository'

export const makeCreateGoal = (): DbCreateGoal => {
  const repository = new DrizzleGoalRepository()
  return new DbCreateGoal(repository)
}
