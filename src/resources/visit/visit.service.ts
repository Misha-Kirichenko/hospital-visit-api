import { TIME_OFFSET, VISIT_TIME, START_HOUR, OFF_HOUR } from '@/common/constants';
import VisitModel from './visit.model';
import DoctorModel from '@/resources/doctor/doctor.model';
import { CreateVisit, Visit } from '@/resources/visit/types';
import { getDateTimeWithOffset, hoursDiff, isWeekend } from '@/utils/functions';
import doctorVisitsModel from './doctorVisits.model';

class VisitService {
  private visit = VisitModel;
  private doctor = DoctorModel;
  private doctorVisits = doctorVisitsModel;

  public async create(visitDto: CreateVisit): Promise<Visit> {
    try {
      const { doctorId } = visitDto;
      const visitDate = new Date(visitDto.date);
      const visitDayIsWeekend = isWeekend(visitDate);

      if (new Date() > visitDate) {
        throw new Error('A visit cannot be scheduled in the past');
      }

      if(hoursDiff(new Date(), visitDate) < 2) {
        throw new Error('A visit must be scheduled at least 2 hours earlier');
      }

      if (visitDayIsWeekend) {
        throw new Error('A visit cannot be scheduled for a weekend');
      }

      const validTime: boolean =
        visitDate.getHours() >= START_HOUR && visitDate.getHours() <= OFF_HOUR;

      if (!validTime) {
        const message = `A visit cannot be scheduled earlier than ${START_HOUR
          .toString()
          .padStart(2, '0')}:00 and later than ${OFF_HOUR
          .toString()
          .padStart(2, '0')}:00`;

        throw new Error(message);
      }

      const foundDoctor = await this.doctor.findOne({ _id: doctorId });

      if (!foundDoctor) {
        throw new Error('Doctor was not found');
      }

      const visitWithDoctor = { ...visitDto, doctor: foundDoctor };

      const beforeVisit = new Date(visitDto.date).getTime() - VISIT_TIME;
      const afterVisit = new Date(visitDto.date).getTime() + VISIT_TIME;

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

      newVisit.date = getDateTimeWithOffset(TIME_OFFSET, newVisit.date);

      newVisit.createdAt = getDateTimeWithOffset(
        TIME_OFFSET,
        newVisit.createdAt
      );

      newVisit.updatedAt = getDateTimeWithOffset(
        TIME_OFFSET,
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
