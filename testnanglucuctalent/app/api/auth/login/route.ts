// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { supabaseAdmin } from '@/app/lib/supabase/server'
import { rateLimit, RATE_LIMITS } from '@/app/lib/rate-limit'
import { logEvent } from '@/app/lib/logger'
import { sendNotification } from '@/app/lib/notifications'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh-secret-change-this'

// Demo account for development
const DEMO_EMAIL = 'admin@demo.com'
const DEMO_PASSWORD = 'admin123'
const DEMO_PASSWORD_HASH = '$2a$10$xK.0...' // bcrypt hash of 'admin123'

interface LoginRequest {
  email: string
  password: string
  rememberMe?: boolean
}

interface LoginResponse {
  success: boolean
  token: string
  refreshToken: string
  user: {
    id: string
    email: string
    name: string
    role: string
    organizationId: string
    permissions: string[]
  }
  expiresIn: number
}

interface LoginError {
  message: string
  code: string
  timestamp: string
}

// Helper: Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Helper: Get client IP
function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

// Helper: Validate password strength
function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Mật khẩu phải có ít nhất 8 ký tự')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Mật khẩu phải chứa ít nhất một chữ in hoa')
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Mật khẩu phải chứa ít nhất một chữ thường')
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Mật khẩu phải chứa ít nhất một số')
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

// Helper: Generate tokens
function generateTokens(user: any) {
  const accessTokenPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
    organizationId: user.organizationId,
    type: 'access'
  }

  const refreshTokenPayload = {
    id: user.id,
    email: user.email,
    type: 'refresh'
  }

  const accessToken = jwt.sign(accessTokenPayload, JWT_SECRET, {
    expiresIn: '15m',
    issuer: 'auth-service',
    audience: 'api'
  })

  const refreshToken = jwt.sign(refreshTokenPayload, JWT_REFRESH_SECRET, {
    expiresIn: '7d',
    issuer: 'auth-service'
  })

  return { accessToken, refreshToken }
}

// Helper: Get user permissions from database
async function getUserPermissions(userId: string): Promise<string[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('user_permissions')
      .select('permission')
      .eq('user_id', userId)

    if (error) throw error

    return data?.map((p: any) => p.permission) || []
  } catch (error) {
    console.error('Error fetching permissions:', error)
    return []
  }
}

// Helper: Check if account is locked
async function isAccountLocked(email: string): Promise<boolean> {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('locked_until')
      .eq('email', email)
      .single()

    if (error) return false

    if (!data?.locked_until) return false

    const lockedUntil = new Date(data.locked_until)
    const now = new Date()

    return lockedUntil > now
  } catch (error) {
    return false
  }
}

// Helper: Increment failed login attempts
async function incrementFailedAttempts(email: string): Promise<number> {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('failed_login_attempts')
      .eq('email', email)
      .single()

    if (error) throw error

    const currentAttempts = data?.failed_login_attempts || 0
    const newAttempts = currentAttempts + 1

    // Lock account after 5 failed attempts for 15 minutes
    if (newAttempts >= 5) {
      const lockedUntil = new Date(Date.now() + 15 * 60 * 1000)

      await supabaseAdmin
        .from('users')
        .update({
          failed_login_attempts: newAttempts,
          locked_until: lockedUntil.toISOString()
        })
        .eq('email', email)
    } else {
      await supabaseAdmin
        .from('users')
        .update({ failed_login_attempts: newAttempts })
        .eq('email', email)
    }

    return newAttempts
  } catch (error) {
    console.error('Error incrementing failed attempts:', error)
    return 0
  }
}

// Helper: Reset failed login attempts
async function resetFailedAttempts(email: string): Promise<void> {
  try {
    await supabaseAdmin
      .from('users')
      .update({
        failed_login_attempts: 0,
        locked_until: null,
        last_login: new Date().toISOString()
      })
      .eq('email', email)
  } catch (error) {
    console.error('Error resetting failed attempts:', error)
  }
}

// Helper: Send login notification
async function sendLoginNotification(user: any, ipAddress: string): Promise<void> {
  try {
    await sendNotification({
      userId: user.id,
      type: 'login',
      title: 'Đăng nhập thành công',
      body: `Tài khoản của bạn vừa đăng nhập từ ${ipAddress}`,
      data: {
        timestamp: new Date().toISOString(),
        ipAddress
      }
    })
  } catch (error) {
    console.error('Error sending login notification:', error)
  }
}

// Main login handler
export async function POST(request: NextRequest) {
  const startTime = Date.now()
  const clientIp = getClientIp(request)

  try {
    // ====== Input Validation ======
    const body = await request.json()
    const { email, password, rememberMe = false } = body as LoginRequest

    console.log('📥 Login request:', { email, ipAddress: clientIp })

    // Check if email and password are provided
    if (!email || !password) {
      return NextResponse.json(
        {
          message: 'Email và mật khẩu là bắt buộc',
          code: 'MISSING_CREDENTIALS'
        } as LoginError,
        { status: 400 }
      )
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          message: 'Định dạng email không hợp lệ',
          code: 'INVALID_EMAIL'
        } as LoginError,
        { status: 400 }
      )
    }

    // ====== Rate Limiting ======
    const rateLimitKey = `login:${email}`
    const rateLimitResult = await rateLimit(rateLimitKey, RATE_LIMITS.AUTH)

    if (!rateLimitResult.success) {
      console.warn('⚠️ Rate limit exceeded for:', email)

      return NextResponse.json(
        {
          message: `Quá nhiều lần đăng nhập thất bại. Vui lòng thử lại sau ${rateLimitResult.reset} giây`,
          code: 'RATE_LIMIT_EXCEEDED',
          timestamp: new Date().toISOString()
        } as LoginError,
        { status: 429, headers: { 'Retry-After': rateLimitResult.reset.toString() } }
      )
    }

    // ====== Account Lock Check ======
    const locked = await isAccountLocked(email)
    if (locked) {
      console.warn('🔒 Account locked:', email)

      await logEvent(email, 'login_attempt', 'user', email, {
        status: 'locked',
        ipAddress: clientIp
      }, clientIp)

      return NextResponse.json(
        {
          message: 'Tài khoản của bạn đã bị khóa tạm thời do nhiều lần đăng nhập thất bại',
          code: 'ACCOUNT_LOCKED',
          timestamp: new Date().toISOString()
        } as LoginError,
        { status: 423 }
      )
    }

    // ====== Database Query ======
    let user: any

    // Demo account check
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      user = {
        id: 'demo-user-id',
        email: DEMO_EMAIL,
        name: 'Admin Demo',
        role: 'super_admin',
        organizationId: 'demo-org-id',
        isDemo: true
      }
    } else {
      // Production: Query database
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('email', email)
        .single()

      if (error || !data) {
        console.log('❌ User not found:', email)

        await incrementFailedAttempts(email)

        await logEvent(email, 'login_failed', 'user', email, {
          reason: 'user_not_found',
          ipAddress: clientIp
        }, clientIp)

        // Rate limit by IP to prevent user enumeration
        await rateLimit(`login-ip:${clientIp}`, {
          limit: 20,
          window: 300 // 5 minutes
        })

        return NextResponse.json(
          {
            message: 'Email hoặc mật khẩu không đúng',
            code: 'INVALID_CREDENTIALS',
            timestamp: new Date().toISOString()
          } as LoginError,
          { status: 401 }
        )
      }

      user = data
    }

    // ====== Password Verification ======
    let passwordMatch = false

    if (user.isDemo) {
      passwordMatch = password === DEMO_PASSWORD
    } else {
      // Production: Use bcrypt comparison
      passwordMatch = await bcrypt.compare(password, user.password_hash)
    }

    if (!passwordMatch) {
      console.log('❌ Invalid password for:', email)

      const failedAttempts = await incrementFailedAttempts(email)

      await logEvent(email, 'login_failed', 'user', email, {
        reason: 'invalid_password',
        attempts: failedAttempts,
        ipAddress: clientIp
      }, clientIp)

      return NextResponse.json(
        {
          message: 'Email hoặc mật khẩu không đúng',
          code: 'INVALID_CREDENTIALS',
          timestamp: new Date().toISOString()
        } as LoginError,
        { status: 401 }
      )
    }

    // ====== Check Account Status ======
    if (user.status === 'inactive') {
      console.log('❌ Account inactive:', email)

      return NextResponse.json(
        {
          message: 'Tài khoản của bạn đã bị vô hiệu hóa',
          code: 'ACCOUNT_INACTIVE',
          timestamp: new Date().toISOString()
        } as LoginError,
        { status: 403 }
      )
    }

    if (user.status === 'suspended') {
      console.log('❌ Account suspended:', email)

      return NextResponse.json(
        {
          message: 'Tài khoản của bạn đã bị tạm dừng',
          code: 'ACCOUNT_SUSPENDED',
          timestamp: new Date().toISOString()
        } as LoginError,
        { status: 403 }
      )
    }

    // ====== Get User Permissions ======
    const permissions = await getUserPermissions(user.id)

    // ====== Generate Tokens ======
    const { accessToken, refreshToken } = generateTokens({
      ...user,
      permissions
    })

    // ====== Reset Failed Attempts ======
    await resetFailedAttempts(email)

    // ====== Log Success ======
    console.log('✅ Login successful for:', email)

    await logEvent(user.id, 'login_success', 'user', user.id, {
      email,
      ipAddress: clientIp,
      duration: Date.now() - startTime
    }, clientIp)

    // ====== Send Notification ======
    await sendLoginNotification(user, clientIp)

    // ====== Build Response ======
    const response: LoginResponse = {
      success: true,
      token: accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        organizationId: user.organizationId,
        permissions
      },
      expiresIn: 15 * 60 // 15 minutes in seconds
    }

    const nextResponse = NextResponse.json(response, { status: 200 })

    // Set secure cookies for tokens
    if (rememberMe) {
      nextResponse.cookies.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 // 7 days
      })
    }

    return nextResponse
  } catch (error) {
    console.error('❌ Login error:', error)

    await logEvent('unknown', 'login_error', 'auth', 'login', {
      error: error instanceof Error ? error.message : 'Unknown error',
      ipAddress: clientIp,
      duration: Date.now() - startTime
    }, clientIp)

    return NextResponse.json(
      {
        message: 'Đã có lỗi xảy ra, vui lòng thử lại sau',
        code: 'SERVER_ERROR',
        timestamp: new Date().toISOString()
      } as LoginError,
      { status: 500 }
    )
  }
}

// ====== OPTIONS Handler ======
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  })
}