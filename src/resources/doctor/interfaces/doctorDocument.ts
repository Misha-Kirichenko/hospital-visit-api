import { Document } from 'mongoose';
import { Doctor } from './doctor.interface';

export interface DoctorDocument extends Doctor, Document {}
