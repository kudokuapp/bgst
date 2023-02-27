import * as jwt from 'jsonwebtoken';

export const APP_SECRET = process.env.APP_SECRET as string;

export interface AuthTokenPayload {
  email: string;
}

export function decodeAuthHeader(authHeader: string): AuthTokenPayload {
  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    throw new Error('No token found');
  }

  return jwt.verify(token, APP_SECRET) as AuthTokenPayload;
}
