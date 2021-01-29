export enum StatusTypes {
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface IResponse {
  message: string;
  status: StatusTypes;
  data: any;
}
