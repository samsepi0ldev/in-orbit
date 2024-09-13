import { DbGetWeekPendingGoals } from '@/data/usecases'
import { DrizzleGoalRepository } from '@/infra/drizzle-goal-repository'

export const makeGetWeekPendingGoals = (): DbGetWeekPendingGoals => {
  const repository = new DrizzleGoalRepository()
  return new DbGetWeekPendingGoals(repository)
}
