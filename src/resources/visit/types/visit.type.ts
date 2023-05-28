import { VisitDocument } from '@/resources/visit/interfaces';
export type Visit = Omit<VisitDocument, 'Document'>;
