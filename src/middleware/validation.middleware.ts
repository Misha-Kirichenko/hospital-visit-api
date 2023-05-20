import { Dto } from '@/utils/interfaces';
import { Request, Response, NextFunction, RequestHandler } from 'express';

class ValidationMiddleWare {
  private dto;
  constructor(dto: Dto) {
    this.dto = dto;
  }
  public checkAllowedAndRequired: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const errors: string[] = [];
    const { body } = req;

    for (const field in this.dto) {
      if (this.dto[field].required && !body.hasOwnProperty(field)) {
        errors.push(`${field} is required`);
      }
    }

    for (const field in body) {
      if (!this.dto.hasOwnProperty(field)) {
        errors.push(`${field} is not allowed`);
      }
    }

    if (!errors.length) return next();
    return res.status(422).json({ errors });
  };

  public validate: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const errors: string[] = [];
    const { body } = req;

    for (const field in body) {
      if (!this.dto[field].validator(body[field])) {
        errors.push(this.dto[field].msg);
      }
    }

    if (!errors.length) return next();
    return res.status(422).json({ errors });
  };
}

export default ValidationMiddleWare;
