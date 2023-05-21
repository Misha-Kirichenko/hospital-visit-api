import { Schema, model } from 'mongoose';
import { Admin } from './interfaces';

const AdminSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      minlength: 2,
    },
    password: {
      type: String,
      required: true,
    },
    accessRights: {
      type: Array,
      required: true,
    },
  },
  { timestamps: false, versionKey: false }
);

export default model<Admin>('Admin', AdminSchema);
