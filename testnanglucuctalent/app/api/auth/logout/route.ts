// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/app/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const authUser = getAuthUser(request)
    const clientIp = request.headers.get('x-forwarded-for') || 'unknown'
    
    // Logout logic - simply return success
    // Token will be removed client-side
    
    console.log(`User logged out: ${authUser?.email || 'unknown'} from IP: ${clientIp}`)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Đăng xuất thành công' 
    })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { message: 'Đăng xuất thất bại' },
      { status: 500 }
    )
  }
}