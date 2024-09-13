import type { Controller, HttpResponse } from '@/presentation/protocols'
import type { GetWeekSummary } from '@/domain/usecases'
import { ok, serverError } from '@/presentation/helpers'

export class GetWeekSummaryController implements Controller {
  constructor(private readonly getWeekSummary: GetWeekSummary) {}

  async handle(_: any): Promise<HttpResponse> {
    try {
      const summary = await this.getWeekSummary.get()
      return ok(summary)
    } catch (error) {
      return serverError(error)
    }
  }
}
