// src/types/index.ts
// Basic TypeScript types for the project. Export User and other interfaces for reuse.

export interface User {
  id: number;
  email: string;
  role: 'staff' | 'supervisor' | 'superadmin' | 'administrator' | 'exco';
  name: string;
}