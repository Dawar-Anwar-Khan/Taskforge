// lib/auth.ts
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const SECRET = process.env.JWT_SECRET!

export type Session = {
  id: string
  role: 'admin' | 'employee'
  name?: string
  mustChangePassword?: boolean
  iat?: number
  exp?: number
}

export function signToken(payload: Omit<Session, 'iat' | 'exp'>) {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): Session | null {
  try {
    const decoded = jwt.verify(token, SECRET)
    if (typeof decoded !== 'object' || decoded === null) return null
    return decoded as Session
  } catch {
    return null
  }
}

export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  if (!token) return null
  return verifyToken(token)
}