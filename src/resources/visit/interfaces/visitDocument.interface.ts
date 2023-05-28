import { Doctor } from '@/resources/doctor/interfaces';
import { Document } from 'mongoose';

export interface VisitDocument extends Document {
  name: string;
  surname: string;
  date: Date;
  idCardNumber: string;
  phoneNumber: string;
  doctor: Doctor;
  complaints: string;
  createdAt: Date,
  updatedAt: Date
}
