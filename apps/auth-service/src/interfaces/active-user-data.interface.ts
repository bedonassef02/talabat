import { Role } from '../../../users-service/src/users/enums/role.enum';

export interface ActiveUserData {
  sub: string;
  email: string;
  role: Role;
}
