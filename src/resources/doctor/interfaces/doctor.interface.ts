import { Document } from 'mongoose';

export interface Doctor extends Document {
  readonly name: string;
  readonly surname: string;
  readonly idCardNumber: string;
  readonly phoneNumber: string;
  readonly specialization: string;
}
