import { Role } from '../../../users-service/src/users/enums/role.enum';

export interface ActiveUserData {
  sub: number;
  email: string;
  role: Role;
}
