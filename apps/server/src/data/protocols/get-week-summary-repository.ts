export abstract class GetWeekSummaryRepository {
  abstract getSummary(): Promise<GetWeekSummaryRepository.Output>
}

export namespace GetWeekSummaryRepository {
  export type Output = {
    completed: number
    total: number
    goalsPerDay: Record<
      string,
      {
        id: string
        title: string
        createdAt: string
      }[]
    >
  }
}
