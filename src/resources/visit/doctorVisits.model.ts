import { Schema, model } from 'mongoose';
import { DoctorVisitsDocument } from './interfaces';

const DoctorVisitsSchema = new Schema(
  {
    doctorId: {
      type: String,
      required: true,
    },
    visitDates: {
      type: Array,
      required: true,
    },
  },
  { versionKey: false }
);

export default model<DoctorVisitsDocument>('DoctorVisits', DoctorVisitsSchema);
