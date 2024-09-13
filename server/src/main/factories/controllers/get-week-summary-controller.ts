import { GetWeekSummaryController } from '@/presentation/controllers'
import { makeGetWeekSummary } from '@/main/factories/usecases'

export const makeGetWeekSummaryController = (): GetWeekSummaryController => {
  return new GetWeekSummaryController(makeGetWeekSummary())
}
