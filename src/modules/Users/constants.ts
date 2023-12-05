export const NAME = 'USER'

export enum UserProperties {
  Name = 'firstName',
  Phone = 'phone',
  Email = 'email',
  Gender = 'gender',
}

export const TABLE_HEADER = [
  { id: UserProperties.Name, name: 'Name', isSortable: true },
  { id: UserProperties.Phone, name: 'Phone' },
  { id: UserProperties.Email, name: 'Email' },
  { id: UserProperties.Gender, name: 'Gender' },
]
