import type { CreateGoalCompletion } from '@/domain/usecases'
import type { CreateGoalCompletionRepository } from '@/data/protocols'

export class DbCreateGoalCompletion implements CreateGoalCompletion {
  constructor(
    private readonly createGoalCompletionRepository: CreateGoalCompletionRepository
  ) {}
  async create({
    goalId,
  }: CreateGoalCompletion.Input): Promise<CreateGoalCompletion.Output> {
    const goalCompletion =
      await this.createGoalCompletionRepository.createCompletion({
        goalId,
      })
    return { goalCompletionId: goalCompletion.goalCompletionId }
  }
}
