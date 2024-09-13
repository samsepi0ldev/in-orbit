import type { Controller } from '@/presentation/protocols'
import type { RouteHandler } from 'fastify'

type Adapt = (controller: Controller) => RouteHandler

export const fastifyRouteAdapt: Adapt = controller => async (req, res) => {
  const body = {
    ...(req.body as any),
    ...(req.params as any),
    ...(req.query as any),
  } as const
  const { data, statusCode } = await controller.handle(body)
  const json = [200, 201, 204].includes(statusCode)
    ? data
    : { error: data.message }

  return res.status(statusCode).send(json)
}
