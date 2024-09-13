import type { HttpResponse } from '@/presentation/protocols'

export abstract class Controller {
  abstract handle(request: any): Promise<HttpResponse>
}
