import Paging from '@/utils/interfaces/paging.interface';

export interface Query extends Paging {
  readonly specialization?: string;
  readonly search?: string;
}
