import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { fastifyRouteAdapt } from '@/main/adapters'
import {
  makeCreateGoalController,
  makeCreateGoalCompletionController,
  makeGetWeekPendingController,
  makeGetWeekSummaryController,
} from '@/main/factories/controllers'

export const setupGoalRoutes: FastifyPluginAsyncZod = async app => {
  app.post(
    '/goals',
    {
      schema: {
        body: z.object({
          title: z.string(),
          desiredWeeklyFrequency: z.number().int().min(1).max(7),
        }),
      },
    },
    fastifyRouteAdapt(makeCreateGoalController())
  )
  app.post(
    '/completions',
    {
      schema: {
        body: z.object({
          goalId: z.string(),
        }),
      },
    },
    fastifyRouteAdapt(makeCreateGoalCompletionController())
  )
  app.get(
    '/pending-goals',
    {},
    fastifyRouteAdapt(makeGetWeekPendingController())
  )
  app.get('/summary', {}, fastifyRouteAdapt(makeGetWeekSummaryController()))
}
