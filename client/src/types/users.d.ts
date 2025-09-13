export interface UserDb {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'moderator' | 'admin';
  skills: string[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  isOnline?: boolean;
}