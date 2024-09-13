import type { CreateGoal } from '@/domain/usecases'
import type { CreateGoalRepository } from '@/data/protocols'

export class DbCreateGoal implements CreateGoal {
  constructor(private readonly createGoalRepository: CreateGoalRepository) {}
  async create({
    title,
    desiredWeeklyFrequency,
  }: CreateGoal.Input): Promise<void> {
    await this.createGoalRepository.create({
      title,
      desiredWeeklyFrequency,
    })
  }
}
