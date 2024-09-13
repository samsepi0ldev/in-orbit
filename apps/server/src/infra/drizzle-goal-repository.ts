import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { and, asc, count, desc, eq, sql } from 'drizzle-orm'

dayjs.extend(weekOfYear)

import type {
  CreateGoalRepository,
  CreateGoalCompletionRepository,
  GetWeekPendingGoalsRepository,
  GetWeekSummaryRepository,
} from '@/data/protocols'
import { db } from '@/infra/db'
import { goalCompletions, goals } from '@/infra/db/schema'

type Summary = Record<
  string,
  {
    id: string
    title: string
    createdAt: string
  }[]
>

export class DrizzleGoalRepository
  implements
    CreateGoalRepository,
    CreateGoalCompletionRepository,
    GetWeekPendingGoalsRepository,
    GetWeekSummaryRepository
{
  async getSummary(): Promise<GetWeekSummaryRepository.Output> {
    const { currentWeek, currentYear } = this.getCurrentDate()

    const goalsCreatedUpToWeek = db.$with('goals_created_up_to_week').as(
      db
        .select({
          id: goals.id,
          title: goals.title,
          desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
          createdAt: goals.createdAt,
        })
        .from(goals)
        .where(
          and(
            sql`EXTRACT(YEAR FROM ${goals.createdAt}) = ${currentYear}`,
            sql`EXTRACT(WEEK FROM ${goals.createdAt}) = ${currentWeek}`
          )
        )
    )

    const goalsCompletedInWeek = db.$with('goals_completed_in_week').as(
      db
        .select({
          id: goalCompletions.id,
          title: goals.title,
          createdAt: goalCompletions.createdAt,
          completionDate: sql`DATE(${goalCompletions.createdAt})`.as(
            'completionDate'
          ),
        })
        .from(goalCompletions)
        .orderBy(desc(goalCompletions.createdAt))
        .innerJoin(goals, eq(goals.id, goalCompletions.goalId))
        .where(
          and(
            sql`EXTRACT(YEAR FROM ${goals.createdAt}) = ${currentYear}`,
            sql`EXTRACT(WEEK FROM ${goals.createdAt}) = ${currentWeek}`
          )
        )
    )
    const goalsCompletedByWeekDay = db.$with('goals_completed_by_week_day').as(
      db
        .select({
          completionDate: goalsCompletedInWeek.completionDate,
          completions: sql<Summary>`
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', ${goalsCompletedInWeek.id},
              'title', ${goalsCompletedInWeek.title},
              'createdAt', ${goalsCompletedInWeek.createdAt}
            )
          )
        `.as('completions'),
        })
        .from(goalsCompletedInWeek)
        .groupBy(goalsCompletedInWeek.completionDate)
    )

    const [summary] = await db
      .with(goalsCreatedUpToWeek, goalsCompletedInWeek, goalsCompletedByWeekDay)
      .select({
        completed:
          sql<number>`(SELECT COUNT(*) FROM ${goalsCompletedInWeek})::DECIMAL`.mapWith(
            Number
          ),
        total:
          sql<number>`(SELECT SUM(${goalsCreatedUpToWeek.desiredWeeklyFrequency}) FROM ${goalsCreatedUpToWeek})::DECIMAL`.mapWith(
            Number
          ),
        goalsPerDay: sql<Summary>`JSON_OBJECT_AGG(${goalsCompletedByWeekDay.completionDate}, ${goalsCompletedByWeekDay.completions})`,
      })
      .from(goalsCompletedByWeekDay)

    return summary
  }
  async getPending(): Promise<GetWeekPendingGoalsRepository.Output> {
    const { currentWeek, currentYear } = this.getCurrentDate()

    const goalsCreatedUpToWeek = db.$with('goals_created_up_to_week').as(
      db
        .select({
          id: goals.id,
          title: goals.title,
          desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
          createdAt: goals.createdAt,
        })
        .from(goals)
        .where(
          and(
            sql`EXTRACT(YEAR FROM ${goals.createdAt}) = ${currentYear}`,
            sql`EXTRACT(WEEK FROM ${goals.createdAt}) = ${currentWeek}`
          )
        )
    )

    const goalsCompletionCount = db.$with('goal_completion_counts').as(
      db
        .select({
          goalId: goals.id,
          completionCount: count(goalCompletions.id).as('completionCount'),
        })
        .from(goalCompletions)
        .innerJoin(goals, eq(goals.id, goalCompletions.goalId))
        .groupBy(goals.id)
    )

    const pendingGoals = await db
      .with(goalsCreatedUpToWeek, goalsCompletionCount)
      .select({
        id: goalsCreatedUpToWeek.id,
        title: goalsCreatedUpToWeek.title,
        desiredWeeklyFrequency: goalsCreatedUpToWeek.desiredWeeklyFrequency,
        completionCount:
          sql`COALESCE(${goalsCompletionCount.completionCount}, 0)`.mapWith(
            Number
          ),
      })
      .from(goalsCreatedUpToWeek)
      .orderBy(asc(goalsCreatedUpToWeek.createdAt))
      .leftJoin(
        goalsCompletionCount,
        eq(goalsCreatedUpToWeek.id, goalsCompletionCount.goalId)
      )
    return pendingGoals
  }
  async createCompletion({
    goalId,
  }: CreateGoalCompletionRepository.Input): Promise<CreateGoalCompletionRepository.Output> {
    const { currentWeek, currentYear } = this.getCurrentDate()

    const goalCompletionCounts = db.$with('goal_completion_counts').as(
      db
        .select({
          goalId: goalCompletions.goalId,
          completionCount: sql`COUNT(${goalCompletions.id})`.as(
            'completionCount'
          ),
        })
        .from(goalCompletions)
        .where(
          and(
            eq(goalCompletions.goalId, goalId),
            sql`EXTRACT(YEAR FROM ${goalCompletions.createdAt}) = ${currentYear}`,
            sql`EXTRACT(WEEK FROM ${goalCompletions.createdAt}) = ${currentWeek}`
          )
        )
        .groupBy(goalCompletions.goalId)
    )

    const result = await db
      .with(goalCompletionCounts)
      .select({
        isIncomplete: sql`COALESCE(${goals.desiredWeeklyFrequency}, 0) > COALESCE(${goalCompletionCounts.completionCount}, 0)`,
      })
      .from(goals)
      .leftJoin(goalCompletionCounts, eq(goals.id, goalCompletionCounts.goalId))
      .where(eq(goals.id, goalId))
      .limit(1)

    const { isIncomplete } = result[0]

    if (!isIncomplete) {
      throw new Error('Goal already completed this week!')
    }

    const [goalCompletion] = await db
      .insert(goalCompletions)
      .values({
        goalId,
      })
      .returning()

    return { goalCompletionId: goalCompletion.id }
  }
  async create({
    desiredWeeklyFrequency,
    title,
  }: CreateGoalRepository.Input): Promise<CreateGoalRepository.Output> {
    const result = await db
      .insert(goals)
      .values({
        title,
        desiredWeeklyFrequency,
      })
      .returning()

    const goal = result[0]

    return goal
  }

  private getCurrentDate() {
    return {
      currentYear: dayjs().year(),
      currentWeek: dayjs().week(),
    }
  }
}
