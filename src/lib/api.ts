// src/lib/api.ts
// Updated to import User type from src/types. Minor fixes for consistency.

import { User } from '@/types';

interface LoginResponse {
  token: string;
  user: User;
}

interface MFAResponse {
  mfaRequired: boolean;
  mfaToken: string;
}

interface VerifyMFAResponse {
  token: string;
  user: User;
}

export const mockUsers: User[] = [
  {
    id: 1,
    email: 'admin@pms.com',
    role: 'superadmin',
    name: 'Super Admin',
  },
  {
    id: 2,
    email: 'supervisor@pms.com',
    role: 'supervisor',
    name: 'John Supervisor',
  },
  {
    id: 3,
    email: 'staff@pms.com',
    role: 'staff',
    name: 'Jane Staff',
  },
  {
    id: 4,
    email: 'admin@pms.com',
    role: 'administrator',
    name: 'Admin User',
  },
  {
    id: 5,
    email: 'exco@pms.com',
    role: 'exco',
    name: 'Exec Officer',
  },
];

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = mockUsers.find((u) => u.email === email);
  if (!user || password !== 'password123') {
    throw new Error('Invalid email or password');
  }

  if (Math.random() > 0.5) {
    throw new Error('MFA_REQUIRED');
  }

  return {
    token: 'mock-jwt-token',
    user,
  };
};

export const initiateMFA = async (email: string): Promise<MFAResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    mfaRequired: true,
    mfaToken: 'mock-mfa-token',
  };
};

export const verifyMFA = async (mfaToken: string, code: string): Promise<VerifyMFAResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (code !== '123456') {
    throw new Error('Invalid verification code');
  }
  const user = mockUsers.find((u) => u.email === 'admin@pms.com');
  if (!user) throw new Error('User not found');
  return {
    token: 'mock-jwt-token-with-mfa',
    user,
  };
};

export const forgotPassword = async (email: string): Promise<{ message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (!mockUsers.some((u) => u.email === email)) {
    throw new Error('Email not found');
  }
  return { message: 'Reset link sent to your email' };
};

export const verifyResetCode = async (email: string, code: string): Promise<{ valid: boolean }> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (code === '123456') return { valid: true };
  throw new Error('Invalid reset code');
};

export const resetPassword = async (email: string, newPassword: string): Promise<{ message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { message: 'Password reset successfully' };
};