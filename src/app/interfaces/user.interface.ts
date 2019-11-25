export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  department: string | number;
  position: string | number;
  type: string;
  actions?: string;
}
