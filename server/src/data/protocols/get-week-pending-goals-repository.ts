import type { GetWeekPendingGoals } from '@/domain/usecases'

export abstract class GetWeekPendingGoalsRepository {
  abstract getPending(): Promise<GetWeekPendingGoalsRepository.Output>
}

export namespace GetWeekPendingGoalsRepository {
  export type Output = Array<{
    id: string
    title: string
    desiredWeeklyFrequency: number
    completionCount: number
  }>
}
