import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'

export interface AuthUser {
  id: string
  email: string
  name: string
  role: string
  organizationId: string
}

export function signToken(user: Omit<AuthUser, 'iat' | 'exp'>): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): AuthUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthUser
  } catch (error) {
    return null
  }
}

export function getAuthUser(request: NextRequest): AuthUser | null {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null
    }
    const token = authHeader.split(' ')[1]
    return verifyToken(token)
  } catch (error) {
    return null
  }
}

export function getAuthUserFromToken(token: string): AuthUser | null {
  return verifyToken(token)
}