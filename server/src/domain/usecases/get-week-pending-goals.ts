export abstract class GetWeekPendingGoals {
  abstract get(): Promise<GetWeekPendingGoals.Output>
}

export namespace GetWeekPendingGoals {
  export type Output = {
    pendingGoals: Array<{
      id: string
      title: string
      desiredWeeklyFrequency: number
      completionCount: number
    }>
  }
}
