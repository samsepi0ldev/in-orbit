import { GetWeekPendingGoalsController } from '@/presentation/controllers'
import { makeGetWeekPendingGoals } from '@/main/factories/usecases'

export const makeGetWeekPendingController =
  (): GetWeekPendingGoalsController => {
    return new GetWeekPendingGoalsController(makeGetWeekPendingGoals())
  }
