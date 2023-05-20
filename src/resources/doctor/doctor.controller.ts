import { Router, Request, Response, NextFunction } from 'express';
import { Controller } from '@/utils/interfaces';
import HttpException from '@/utils/exceptions/http.exception';
import DoctorService from '@/resources/doctor/doctor.service';
import { Doctor } from '@/resources/doctor/interfaces';
import { createDoctorDto, updateDoctorDto } from '@/resources/doctor/dto';
import ValidationMiddleWare from '@/middleware/validation.middleware';

class DoctorController implements Controller {
  public router: Router;
  public path = '/doctor';
  private doctorService: DoctorService;
  constructor() {
    this.router = Router();
    this.doctorService = new DoctorService();
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    const createMiddleware = new ValidationMiddleWare(createDoctorDto);
    const updateMiddleware = new ValidationMiddleWare(updateDoctorDto);
    //get doctors list
    this.router.get(this.path, this.getList);

    //create doctor
    this.router.post(
      this.path,
      createMiddleware.checkAllowedAndRequired,
      createMiddleware.validate,
      this.create
    );

    //delete doctor by id
    this.router.delete(`${this.path}/:id`, this.delete);

    // //update doctor by id
    this.router.patch(
      `${this.path}/:id`,
      updateMiddleware.checkAllowedAndRequired,
      updateMiddleware.validate,
      this.update
    );
  }

  private getList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<Doctor[]> | void> => {
    try {
      const doctors = await this.doctorService.getList(req.query);
      return res.json(doctors);
    } catch (error) {
      const errMsg = error as Error;
      next(new HttpException(400, errMsg.message));
    }
  };

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

  private delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<{ success: boolean }> | { msg: string } | void> => {
    try {
      const {
        params: { id },
      } = req;
      const deleted = await this.doctorService.delete(id);
      if (deleted) return res.json({ success: true });
      return res.status(404).json({ msg: 'doctor not found' });
    } catch (error) {
      const errMsg = error as Error;
      next(new HttpException(400, errMsg.message));
    }
  };

  private update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<{ success: boolean }> | { msg: string } | void> => {
    try {
      const {
        params: { id },
        body,
      } = req;
      const updated = await this.doctorService.update(id, body);
      if (updated) return res.json({ success: true });
      return res.status(404).json({ msg: 'doctor not found' });
    } catch (error) {
      const errMsg = error as Error;
      next(new HttpException(400, errMsg.message));
    }
  };
}

export default DoctorController;
