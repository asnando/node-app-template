import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import pid from '../../utils/pid';

export default function indexController(req: ExpressRequest, res: ExpressResponse) {
  return res.status(200).end(pid().toString());
}
