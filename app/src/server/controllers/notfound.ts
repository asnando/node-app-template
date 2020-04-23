import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';

export default function indexController(req: ExpressRequest, res: ExpressResponse) {
  return res.status(404).end('Not found');
}
