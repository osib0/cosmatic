import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET ?? 'fallback_secret_change_me';

export interface JWTPayload {
  userId: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  [key: string]: unknown;
}

export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<JWTPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  if (!token) return null;
  return verifyToken(token);
}

export function getSessionFromRequest(req: NextRequest): JWTPayload | null {
  const token = req.cookies.get('auth_token')?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function requireAuth(req: NextRequest): Promise<JWTPayload> {
  const session = getSessionFromRequest(req);
  if (!session) throw new Error('Unauthorized');
  return session;
}

export async function requireAdmin(req: NextRequest): Promise<JWTPayload> {
  const session = getSessionFromRequest(req);
  if (!session) throw new Error('Unauthorized');
  if (session.role !== 'admin') throw new Error('Forbidden: Admin access required');
  return session;
}
