export interface User {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  userType: UserType;
  region?: string;
  city?: string;
  organization?: string;
  inn?: string;
  legalPersonType?: string;
}

export enum UserType {
  PERSON = 1,
  LEGAL = 2
}
