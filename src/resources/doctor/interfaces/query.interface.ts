import { Paging } from '@/utils/interfaces';

export interface Query extends Paging {
  readonly specialization?: string;
  readonly search?: string;
}
