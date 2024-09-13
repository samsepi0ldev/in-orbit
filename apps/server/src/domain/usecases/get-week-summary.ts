export abstract class GetWeekSummary {
  abstract get(): Promise<GetWeekSummary.Output>
}

export namespace GetWeekSummary {
  export type Output = {
    summary: {
      completed: number
      total: number
      goalsPerDay: any
    }
  }
}
