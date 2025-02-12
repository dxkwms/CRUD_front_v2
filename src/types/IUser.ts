export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
  profiles: [IProfile];
}

export interface IProfile {
  _id: string;
  name: string;
  phoneNumber: string;
  location: string;
  country: string;
  birthdate: string;
  avatar: string;
  gender: string;
}
