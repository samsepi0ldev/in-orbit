import { DbGetWeekSummary } from '@/data/usecases'
import { DrizzleGoalRepository } from '@/infra/drizzle-goal-repository'

export const makeGetWeekSummary = (): DbGetWeekSummary => {
  const repository = new DrizzleGoalRepository()
  return new DbGetWeekSummary(repository)
}
