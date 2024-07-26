export interface IUser {
    _id: number | string;
    email: string;
    password: string;
    name: string;
    role: string;
    avatar?: string;
}