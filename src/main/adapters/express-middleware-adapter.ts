import { HttpRequest } from '@/presentation/protocols'
import { Middleware } from '@/presentation/protocols/middleware'

import {
  Request,
  Response,
  NextFunction,
  RequestHandler
} from 'express'

export const adaptMiddleware = (middleware: Middleware): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      headers: req.headers
    }
    const httpResponse = await middleware.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body)
      next()
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      }).end()
    }
  }
}
