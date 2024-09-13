import type { CreateGoal } from '@/domain/usecases'
import type { Controller, HttpResponse } from '@/presentation/protocols'
import { created, serverError } from '@/presentation/helpers'

type Request = {
  title: string
  desiredWeeklyFrequency: number
}

export class CreateGoalController implements Controller {
  constructor(private readonly createGoal: CreateGoal) {}
  async handle({
    title,
    desiredWeeklyFrequency,
  }: Request): Promise<HttpResponse> {
    try {
      await this.createGoal.create({
        title,
        desiredWeeklyFrequency,
      })
      return created(null)
    } catch (error) {
      return serverError(error)
    }
  }
}
