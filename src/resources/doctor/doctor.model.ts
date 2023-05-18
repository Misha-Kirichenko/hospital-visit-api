import { Schema, model } from 'mongoose';
import Doctor from '@/resources/doctor/doctor.interface';

const DoctorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    surname: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    idCardNumber: {
      unique: true,
      type: String,
      required: true,
      minlength: 11,
      maxlength: 11,
    },
    phoneNumber: {
      unique: true,
      type: String,
      required: true,
      minlength: 12,
      maxlength: 12
    },
    specialization: {
      type: String,
      minlength: 2,
      required: true,
    },
  },
  { timestamps: false, versionKey: false }
);

export default model<Doctor>('Doctor', DoctorSchema);
