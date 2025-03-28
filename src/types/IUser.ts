export enum Role {
  User = "user",
  Admin = "admin",
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  avatar: string;
  accessToken?: string;
}

export interface IProfile {
  _id?: string;
  name: string;
  phoneNumber: string;
  location: string;
  country: string;
  birthdate: string;
  avatar: string;
  gender: string;
}

export interface IUserForEdit {
  role: Role;
  name: string;
  avatar: File | null | string;
  email: string;
}
