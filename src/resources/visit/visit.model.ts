import { Schema, model } from 'mongoose';
import { VisitDocument } from './interfaces';

const VisitSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
    },
    surname: {
      type: String,
      required: true,
      minlength: 2,
    },
    date: {
      type: Date,
      required: true,
    },
    idCardNumber: {
      type: String,
      required: true,
      minlength: 11,
      maxlength: 11,
    },
    phoneNumber: {
      type: String,
      minlength: 12,
      maxlength: 12,
    },
    doctor: {
      type: Schema.Types.Mixed,
      required: true,
    },
    complaints: {
      type: String,
      required: true,
      minlength: 10,
    },
  },
  { timestamps: true, versionKey: false }
);

export default model<VisitDocument>('Visit', VisitSchema);
