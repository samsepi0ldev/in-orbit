import type { CreateGoal } from '@/domain/usecases'

export abstract class CreateGoalRepository {
  abstract create(
    input: CreateGoalRepository.Input
  ): Promise<CreateGoalRepository.Output>
}

export namespace CreateGoalRepository {
  export type Input = CreateGoal.Input
  export type Output = {
    id: string
    title: string
    desiredWeeklyFrequency: number
    createdAt: Date
  }
}
