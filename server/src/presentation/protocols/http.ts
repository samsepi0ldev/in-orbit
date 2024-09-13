export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  SERVER_ERROR = 500,
}

export interface HttpResponse<T = any> {
  data: T
  statusCode: HttpStatusCode
}
