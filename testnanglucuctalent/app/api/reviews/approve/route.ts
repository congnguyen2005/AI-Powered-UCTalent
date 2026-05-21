// app/api/reviews/approve/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/app/lib/auth'

// Lưu trữ responses đã duyệt (trong thực tế sẽ dùng database)
const approvedResponses: Record<string, string> = {}

export async function POST(request: NextRequest) {
  try {
    const authUser = getAuthUser(request)
    if (!authUser) {
      return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 })
    }

    const { reviewId, response } = await request.json()

    if (!reviewId || !response) {
      return NextResponse.json({ error: 'Thiếu thông tin' }, { status: 400 })
    }

    // Lưu response đã duyệt
    approvedResponses[reviewId] = response
    
    console.log(`✅ User ${authUser.email} đã phê duyệt review ${reviewId}`)
    console.log(`📝 Phản hồi: ${response.substring(0, 100)}...`)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Đã phê duyệt phản hồi',
      reviewId,
      response 
    })
  } catch (error) {
    console.error('Lỗi phê duyệt:', error)
    return NextResponse.json(
      { error: 'Không thể phê duyệt phản hồi' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const reviewId = searchParams.get('reviewId')
  
  if (reviewId && approvedResponses[reviewId]) {
    return NextResponse.json({ response: approvedResponses[reviewId] })
  }
  
  return NextResponse.json({ responses: approvedResponses })
}