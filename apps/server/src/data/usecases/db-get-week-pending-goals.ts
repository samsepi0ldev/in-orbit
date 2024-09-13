import type { GetWeekPendingGoals } from '@/domain/usecases'
import type { GetWeekPendingGoalsRepository } from '@/data/protocols'

export class DbGetWeekPendingGoals implements GetWeekPendingGoals {
  constructor(
    private readonly getWeekPendingGoalsRepository: GetWeekPendingGoalsRepository
  ) {}
  async get(): Promise<GetWeekPendingGoals.Output> {
    const pendingGoals = await this.getWeekPendingGoalsRepository.getPending()
    return { pendingGoals }
  }
}
