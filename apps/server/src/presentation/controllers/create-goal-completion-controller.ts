import type { Controller, HttpResponse } from '@/presentation/protocols'
import type { CreateGoalCompletion } from '@/domain/usecases'
import { created, serverError } from '@/presentation/helpers'

type Request = {
  goalId: string
}

export class CreateGoalCompletionController implements Controller {
  constructor(private readonly createGoalCompletion: CreateGoalCompletion) {}

  async handle({ goalId }: Request): Promise<HttpResponse> {
    try {
      const goalCompletionId = await this.createGoalCompletion.create({
        goalId,
      })
      return created(goalCompletionId)
    } catch (error) {
      return serverError(error)
    }
  }
}
