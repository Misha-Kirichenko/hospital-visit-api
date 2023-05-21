import { VisitDocument } from '@/resources/visit/interfaces';
export type NewVisit = Omit<VisitDocument, 'Document'>;
