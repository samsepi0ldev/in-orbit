import type { Controller, HttpResponse } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/helpers'
import type { GetWeekPendingGoals } from '@/domain/usecases'

export class GetWeekPendingGoalsController implements Controller {
  constructor(private readonly getWeekPendingGoals: GetWeekPendingGoals) {}

  async handle(_: any): Promise<HttpResponse> {
    try {
      const pendingGoals = await this.getWeekPendingGoals.get()
      return ok(pendingGoals)
    } catch (error) {
      return serverError(error)
    }
  }
}
