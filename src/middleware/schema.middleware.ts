import { Request, Response, NextFunction, RequestHandler } from 'express';

class SchemaMiddleWare {
  private schema: string[];
  constructor(schema: string[]) {
    this.schema = schema;
  }
  validateSchema: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const errors: string[] = [];

    for (const field of this.schema) {
      if (!req.body.hasOwnProperty(field)) {
        errors.push(`${field} is required`);
      }
    }

    if (errors.length) return res.status(422).json({ errors });
    return next();
  };
}

export default SchemaMiddleWare;
