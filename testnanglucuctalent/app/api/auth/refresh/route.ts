import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh-secret-change-this'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { refreshToken } = body

    if (!refreshToken) {
      return NextResponse.json(
        { message: 'Refresh token là bắt buộc', code: 'MISSING_REFRESH_TOKEN' },
        { status: 400 }
      )
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as any

    // Generate new access token
    const newAccessToken = jwt.sign(
      {
        id: decoded.id,
        email: decoded.email,
        type: 'access'
      },
      JWT_SECRET,
      { expiresIn: '15m' }
    )

    return NextResponse.json({
      success: true,
      token: newAccessToken,
      expiresIn: 15 * 60
    })
  } catch (error) {
    console.error('Refresh token error:', error)

    return NextResponse.json(
      { message: 'Refresh token không hợp lệ', code: 'INVALID_REFRESH_TOKEN' },
      { status: 401 }
    )
  }
}