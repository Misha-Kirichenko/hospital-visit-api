import visitModel from './visit.model';
import doctorModel from '@/resources/doctor/doctor.model';
import { CreateVisit, NewVisit } from '@/resources/visit/types';

class VisitService {
  private visit = visitModel;
  private doctor = doctorModel;
  public async create(visit: CreateVisit): Promise<NewVisit> {
    try {
      const { doctorId } = visit;
      const foundDoctor = await this.doctor.findOne({ _id: doctorId });

      if (!foundDoctor) {
        throw new Error('Doctor was not found');
      }

      const visitWithDoctor = { ...visit, doctor: foundDoctor };
      const newVisit = await this.visit.create(visitWithDoctor);
      return newVisit;
    } catch (error) {
      const errorObj = error as Error;
      throw new Error(errorObj.message);
    }
  }
}

export default VisitService;
