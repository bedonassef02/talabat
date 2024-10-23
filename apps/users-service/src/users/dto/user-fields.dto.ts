type Fields =
  | 'id'
  | 'name'
  | 'email'
  | 'address'
  | 'role'
  | 'createdAt'
  | 'updatedAt';
type UserFields = Fields | `-${Fields}`;

export class UserFieldsDto {
  id?: string;
  fields: UserFields[];
}
