// src/interfaces/user.ts
export interface User {
  id: number;
  username: string;
  email: string;
  status: string;
  role: 'user' | 'admin';
}