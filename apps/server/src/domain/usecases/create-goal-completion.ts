export abstract class CreateGoalCompletion {
  abstract create(
    input: CreateGoalCompletion.Input
  ): Promise<CreateGoalCompletion.Output>
}

export namespace CreateGoalCompletion {
  export type Input = { goalId: string }
  export type Output = { goalCompletionId: string }
}
