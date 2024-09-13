import { HttpStatusCode, type HttpResponse } from '@/presentation/protocols'

export const ok = (data: unknown): HttpResponse => ({
  data,
  statusCode: HttpStatusCode.OK,
})

export const created = (data: unknown): HttpResponse => ({
  data,
  statusCode: HttpStatusCode.CREATED,
})

export const serverError = (data: Error | unknown): HttpResponse => ({
  data,
  statusCode: HttpStatusCode.SERVER_ERROR,
})
