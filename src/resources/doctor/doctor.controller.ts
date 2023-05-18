import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import DoctorService from '@/resources/doctor/doctor.service';
import validateDoctor from '@/resources/doctor/doctor.validation';
import Doctor from '@/resources/doctor/doctor.interface';
import schema from '@/resources/doctor/doctor.schema';
import SchemaMiddleWare from '@/middleware/schema.middleware';

class DoctorController implements Controller {
  public router: Router;
  public path = '/doctor';
  private doctorService: DoctorService;
  private schemaMiddleWare: SchemaMiddleWare;
  constructor() {
    this.router = Router();
    this.doctorService = new DoctorService();
    this.schemaMiddleWare = new SchemaMiddleWare(schema);
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      this.path,
      this.schemaMiddleWare.validateSchema,
      validateDoctor,
      this.create
    );
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<Doctor> | void> => {
    try {
      const doctor = await this.doctorService.create(req.body);
      return res.status(201).json(doctor);
    } catch (error) {
      const errMsg = error as Error;
      next(new HttpException(400, errMsg.message));
    }
  };
}

export default DoctorController;
