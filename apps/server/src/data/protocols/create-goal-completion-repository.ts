import type { CreateGoalCompletion } from '@/domain/usecases'

export abstract class CreateGoalCompletionRepository {
  abstract createCompletion(
    input: CreateGoalCompletionRepository.Input
  ): Promise<CreateGoalCompletionRepository.Output>
}

export namespace CreateGoalCompletionRepository {
  export type Input = CreateGoalCompletion.Input
  export type Output = CreateGoalCompletion.Output
}
