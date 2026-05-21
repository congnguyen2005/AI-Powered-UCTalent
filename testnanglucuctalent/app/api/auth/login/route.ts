import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { supabaseAdmin } from '@/app/lib/supabase/server'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Vui lòng nhập email và mật khẩu' },
        { status: 400 }
      )
    }

    // Tìm user trong database
    let user = null
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('email', email)
        .single()
      
      if (!error && data) {
        user = data
      }
    } catch (dbError) {
      console.log('Database chưa sẵn sàng, dùng tài khoản demo')
    }

    // DEMO MODE: Nếu chưa có database, cho phép tài khoản demo
    if (!user) {
      if (email === 'admin@demo.com' && password === 'admin123') {
        const demoUser = {
          id: 'demo-user-id',
          email: 'admin@demo.com',
          name: 'Admin Demo',
          role: 'super_admin',
          organization_id: 'demo-org-id'
        }
        const token = jwt.sign(
          {
            id: demoUser.id,
            email: demoUser.email,
            name: demoUser.name,
            role: demoUser.role,
            organizationId: demoUser.organization_id,
          },
          JWT_SECRET,
          { expiresIn: '24h' }
        )
        return NextResponse.json({
          token,
          user: {
            id: demoUser.id,
            email: demoUser.email,
            name: demoUser.name,
            role: demoUser.role,
            organizationId: demoUser.organization_id,
          },
        })
      } else {
        return NextResponse.json(
          { message: 'Email hoặc mật khẩu không đúng' },
          { status: 401 }
        )
      }
    }

    // Verify password (nếu có database thật)
    const isValid = await bcrypt.compare(password, user.password_hash)
    if (!isValid) {
      return NextResponse.json(
        { message: 'Email hoặc mật khẩu không đúng' },
        { status: 401 }
      )
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        organizationId: user.organization_id,
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        organizationId: user.organization_id,
      },
    })
  } catch (error) {
    console.error('Lỗi đăng nhập:', error)
    return NextResponse.json(
      { message: 'Đăng nhập thất bại' },
      { status: 500 }
    )
  }
}