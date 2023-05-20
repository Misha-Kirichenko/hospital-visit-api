import { Router, Request, Response, NextFunction } from 'express';
import { Controller } from '@/utils/interfaces';
import HttpException from '@/utils/exceptions/http.exception';
import AdminService from '@/resources/admin/admin.service';

class AdminController implements Controller {
  public router: Router;
  public path = '/admin';
  private adminService: AdminService;
  constructor() {
    this.router = Router();
    this.adminService = new AdminService();
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(`${this.path}/login`, this.login);
  }

  private login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { email, password } = req.body;
      const token = await this.adminService.login(email, password);
      return res.json(token);
    } catch (error) {
      const errMsg = error as Error;
      next(new HttpException(401, errMsg.message));
    }
  };
}

export default AdminController;
