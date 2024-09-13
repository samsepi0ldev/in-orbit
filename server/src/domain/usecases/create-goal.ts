export abstract class CreateGoal {
  abstract create(input: CreateGoal.Input): Promise<void>
}

export namespace CreateGoal {
  export type Input = {
    title: string
    desiredWeeklyFrequency: number
  }
}
