import { Document } from 'mongoose';

export interface DoctorVisitsDocument extends Document {
  doctorId: string;
  visitDates: { [key: string]: Date }[];
}
