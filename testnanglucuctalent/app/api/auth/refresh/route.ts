// app/api/auth/refresh/route.ts
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { getAuthUser } from '../../../lib/auth'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'

export async function POST(request: NextRequest) {
  try {
    const authUser = getAuthUser(request)
    
    if (!authUser) {
      return NextResponse.json(
        { message: 'Không có quyền truy cập' },
        { status: 401 }
      )
    }
    
    // Create new token
    const newToken = jwt.sign(
      {
        id: authUser.id,
        email: authUser.email,
        name: authUser.name,
        role: authUser.role,
        organizationId: authUser.organizationId,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )
    
    return NextResponse.json({ token: newToken })
  } catch (error) {
    console.error('Refresh token error:', error)
    return NextResponse.json(
      { message: 'Không thể refresh token' },
      { status: 500 }
    )
  }
}
