import Doctor from '@/resources/doctor/doctor.interface';
import DoctorModel from '@/resources/doctor/doctor.model';

class DoctorService {
  private doctor = DoctorModel;

  public async create(doctorData: Doctor): Promise<Doctor> {
    try {
      const doctor = await this.doctor.create(doctorData);
      return doctor;
    } catch (_) {
      throw new Error('Ooops... Something went wrong!');
    }
  }
}

export default DoctorService;
