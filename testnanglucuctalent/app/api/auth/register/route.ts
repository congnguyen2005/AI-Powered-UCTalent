// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, company } = body

    console.log('📝 Register request:', { name, email, company, passwordProvided: !!password })

    // Validation
    if (!name || !email || !password || !company) {
      return NextResponse.json(
        { message: 'Vui lòng điền đầy đủ thông tin' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Mật khẩu phải có ít nhất 6 ký tự' },
        { status: 400 }
      )
    }

    // Create new user (demo mode - just return success)
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      name,
      role: 'admin',
      organizationId: `org-${Date.now()}`
    }

    const token = jwt.sign(newUser, JWT_SECRET, { expiresIn: '7d' })

    console.log('✅ Registration successful for:', email)

    return NextResponse.json({
      success: true,
      token,
      user: newUser
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'Đăng ký thất bại, vui lòng thử lại sau' },
      { status: 500 }
    )
  }
}