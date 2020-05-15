import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { version as appVersion } from '../../../package.json';

export default function indexController(req: ExpressRequest, res: ExpressResponse) {
  return res.status(200).end(appVersion);
}
