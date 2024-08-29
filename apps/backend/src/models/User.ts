import { Profile } from './profile';

export interface User {
    id: string;
    username: string;
    email: string;
    password: string; // In a real-world app, you'd store a hashed password
    gender: 'male' | 'female';
    profile?: Profile; // Optional: Profile data for male users
}
