import type { GetWeekSummary } from '@/domain/usecases'
import type { GetWeekSummaryRepository } from '@/data/protocols'

export class DbGetWeekSummary implements GetWeekSummary {
  constructor(
    private readonly GetWeekSummaryRepository: GetWeekSummaryRepository
  ) {}
  async get(): Promise<GetWeekSummary.Output> {
    const summary = await this.GetWeekSummaryRepository.getSummary()
    return { summary }
  }
}
