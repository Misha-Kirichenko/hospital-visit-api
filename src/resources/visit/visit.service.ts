import { timeOffSet, visitTime } from '@/common/constants';
import visitModel from './visit.model';
import doctorModel from '@/resources/doctor/doctor.model';
import { CreateVisit, Visit } from '@/resources/visit/types';
import { getDateTimeWithOffset } from '@/utils/functions';
import doctorVisitsModel from './doctorVisits.model';

class VisitService {
  private visit = visitModel;
  private doctor = doctorModel;
  private doctorVisits = doctorVisitsModel;
  public async create(visit: CreateVisit): Promise<Visit> {
    try {
      const { doctorId, date } = visit;
      const foundDoctor = await this.doctor.findOne({ _id: doctorId });

      if (!foundDoctor) {
        throw new Error('Doctor was not found');
      }

      const visitWithDoctor = { ...visit, doctor: foundDoctor };

      const beforeVisit = new Date(date).getTime() - visitTime;
      const afterVisit = new Date(date).getTime() + visitTime;

      const visitReserved = await this.doctorVisits.findOne({
        $and: [
          { doctorId },
          { 'visitDates.date': { $gte: new Date(beforeVisit) } },
          { 'visitDates.date': { $lte: new Date(afterVisit) } },
        ],
      });

      if (visitReserved) throw new Error('This time is already reserved');

      const newVisit = await this.visit.create(visitWithDoctor);
      await this.doctorVisits.updateOne(
        { doctorId },
        {
          $push: { visitDates: { visitId: newVisit._id, date: newVisit.date } },
        },
        { upsert: true }
      );

      newVisit.date = getDateTimeWithOffset(timeOffSet, newVisit.date);

      newVisit.createdAt = getDateTimeWithOffset(
        timeOffSet,
        newVisit.createdAt
      );

      newVisit.updatedAt = getDateTimeWithOffset(
        timeOffSet,
        newVisit.updatedAt
      );

      return newVisit;
    } catch (error) {
      const errorObj = error as Error;
      throw new Error(errorObj.message);
    }
  }
}

export default VisitService;
