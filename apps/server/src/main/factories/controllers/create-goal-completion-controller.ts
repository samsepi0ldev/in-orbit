import { CreateGoalCompletionController } from '@/presentation/controllers'
import { makeCreateGoalCompletion } from '@/main/factories/usecases'

export const makeCreateGoalCompletionController =
  (): CreateGoalCompletionController => {
    return new CreateGoalCompletionController(makeCreateGoalCompletion())
  }
