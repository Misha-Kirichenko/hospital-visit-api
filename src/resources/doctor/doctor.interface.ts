import { Document } from 'mongoose';

export default interface Doctor extends Document {
  name: string;
  surname: string;
  idCardNumber: string;
  phoneNumber: string;
  specialization: string;
}
