import { Profile } from './Profile';

export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    gender: 'male' | 'female';
    profile?: Profile;
}
