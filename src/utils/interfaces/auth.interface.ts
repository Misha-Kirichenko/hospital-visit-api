import { Request } from 'express';

export interface Auth extends Request {
  user?: any;
}
