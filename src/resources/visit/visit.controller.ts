import { Router, Request, Response, NextFunction } from 'express';
import { Controller } from '@/utils/interfaces';
import HttpException from '@/utils/exceptions/http.exception';
import ValidationMiddleWare from '@/middleware/validation.middleware';
import AuthMiddleware from '@/middleware/auth.middleware';
import VisitService from '@/resources/visit/visit.service';
import { createVisitDto } from '@/resources/visit/dto';
import { Visit } from './types';

class VisitController implements Controller {
  public router: Router;
  public path = '/visit';
  private visitService: VisitService;
  constructor() {
    this.router = Router();
    this.visitService = new VisitService();
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    const createMiddleware = new ValidationMiddleWare(createVisitDto);
    //create Visit
    this.router.post(
      this.path,
      AuthMiddleware.verifyToken,
      AuthMiddleware.checkAccessRights('w'),
      createMiddleware.checkAllowedAndRequired,
      createMiddleware.validate,
      this.create
    );
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<Visit> | void> => {
    try {
      const visit = await this.visitService.create(req.body);
      return res.status(201).json(visit);
    } catch (error) {
      const errMsg = error as Error;
      next(new HttpException(400, errMsg.message));
    }
  };
}

export default VisitController;
