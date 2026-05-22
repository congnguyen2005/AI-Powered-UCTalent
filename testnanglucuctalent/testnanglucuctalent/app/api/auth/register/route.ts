import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { supabaseAdmin } from '@/app/lib/supabase/server'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, company } = await request.json()

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

    const hashedPassword = await bcrypt.hash(password, 10)
    
    // DEMO MODE: Trả về thành công ngay lập tức
    const demoUser = {
      id: `user-${Date.now()}`,
      email,
      name,
      role: 'staff',
      organizationId: `org-${Date.now()}`
    }
    
    const token = jwt.sign(
      {
        id: demoUser.id,
        email: demoUser.email,
        name: demoUser.name,
        role: demoUser.role,
        organizationId: demoUser.organizationId,
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    return NextResponse.json({
      token,
      user: demoUser,
    })
    
    /* Bỏ comment khi có database thật
    // Tạo organization mới
    const { data: org, error: orgError } = await supabaseAdmin
      .from('organizations')
      .insert({ name: company, brand_tone: 'professional' })
      .select()
      .single()
    
    if (orgError) throw orgError
    
    // Tạo user mới
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .insert({
        name,
        email,
        password_hash: hashedPassword,
        role: 'admin',
        organization_id: org.id,
      })
      .select()
      .single()
    
    if (userError) throw userError
    
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

    return NextResponse.json({ token, user })
    */
  } catch (error) {
    console.error('Lỗi đăng ký:', error)
    return NextResponse.json(
      { message: 'Đăng ký thất bại' },
      { status: 500 }
    )
  }
}