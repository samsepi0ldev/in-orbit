import { CreateGoalController } from '@/presentation/controllers'
import { makeCreateGoal } from '@/main/factories/usecases'

export const makeCreateGoalController = (): CreateGoalController => {
  return new CreateGoalController(makeCreateGoal())
}
