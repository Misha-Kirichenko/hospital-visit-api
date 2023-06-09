import { Doctor, Query } from '@/resources/doctor/interfaces';
import DoctorModel from '@/resources/doctor/doctor.model';
import VisitModel from '@/resources/visit/visit.model';
import { ObjectId } from 'mongodb';

class DoctorService {
  private doctor = DoctorModel;
  private visit = VisitModel;
  private defaultLimit = 10;
  public async getList(query: Query): Promise<Doctor[]> {
    try {
      const { page = 1, limit, specialization, search } = query;
      const queryObj = search
        ? {
            $or: [
              { name: { $regex: search, $options: 'i' } },
              { surname: { $regex: search, $options: 'i' } },
              { specialization: { $regex: search, $options: 'i' } },
            ],
          }
        : specialization
        ? { specialization }
        : {};
      const pageChunk = (limit || this.defaultLimit) * (page - 1);
      const doctors = await this.doctor
        .find(queryObj)
        .sort({ name: 1, surname: 1 })
        .skip(pageChunk)
        .limit(Number(Number(limit) || this.defaultLimit));
      return doctors;
    } catch (_) {
      throw new Error('Ooops... Something went wrong!');
    }
  }

  public async create(doctorData: Doctor): Promise<Doctor> {
    try {
      const doctor = await this.doctor.create(doctorData);
      return doctor;
    } catch (_) {
      throw new Error('Ooops... Something went wrong!');
    }
  }

  public async delete(id: string): Promise<number> {
    try {
      const { deletedCount: deleted } = await this.doctor.deleteOne({
        _id: id,
      });
      return deleted;
    } catch (_) {
      throw new Error('Ooops... Something went wrong!');
    }
  }

  public async update(id: string, body: Doctor): Promise<number> {
    try {
      const { matchedCount: updated } = await this.doctor.updateOne(
        {
          _id: id,
        },
        body
      );

      const updateRelated: { [key: string]: string | undefined } = {};
      for (const prop in body) {
        updateRelated[`doctor.${prop}`] = body[prop as keyof Doctor];
      }

      await this.visit.updateMany(
        {
          'doctor._id': new ObjectId(id),
        },
        updateRelated
      );

      return updated;
    } catch (_) {
      throw new Error('Ooops... Something went wrong!');
    }
  }
}

export default DoctorService;
