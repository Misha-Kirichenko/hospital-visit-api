export interface Dto {
  [key: string]: { required?: boolean; msg: string; validator: Function };
}
