export interface Dto {
  readonly [key: string]: { required?: boolean; msg: string; validator: Function };
}
