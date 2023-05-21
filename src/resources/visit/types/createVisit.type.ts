import { VisitDocument } from '@/resources/visit/interfaces';
export type CreateVisit = Omit<VisitDocument, 'doctor'> & { doctorId: string };
