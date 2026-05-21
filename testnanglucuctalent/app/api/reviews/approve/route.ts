import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/app/lib/auth'
import { supabaseAdmin } from '@/app/lib/supabase/server'
import { deleteCache } from '@/app/lib/cache'

// In-memory store for demo mode
const approvedResponses: Record<string, { response: string; approvedBy: string; approvedAt: string }> = {}

export async function POST(request: NextRequest) {
  try {
    const authUser = getAuthUser(request)
    if (!authUser) {
      return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 })
    }

    const { reviewId, response } = await request.json()

    if (!reviewId || !response) {
      return NextResponse.json({ error: 'Thiếu thông tin reviewId hoặc response' }, { status: 400 })
    }

    const isDemoMode = process.env.DEMO_MODE === 'true' || !process.env.NEXT_PUBLIC_SUPABASE_URL

    if (isDemoMode) {
      // Demo mode: store in memory
      approvedResponses[reviewId] = {
        response,
        approvedBy: authUser.id,
        approvedAt: new Date().toISOString(),
      }
    } else {
      // Real database: update review and create approved response
      const { error: reviewError } = await supabaseAdmin
        .from('reviews')
        .update({ status: 'approved' })
        .eq('id', reviewId)

      if (reviewError) throw reviewError

      const { error: responseError } = await supabaseAdmin
        .from('approved_responses')
        .upsert({
          review_id: reviewId,
          response_text: response,
          approved_by: authUser.id,
          published_at: new Date().toISOString(),
        })

      if (responseError) throw responseError
    }

    // Clear cache
    await deleteCache(`reviews:${authUser.organizationId}:*`)

    console.log(`✅ User ${authUser.email} approved response for review ${reviewId}`)

    return NextResponse.json({
      success: true,
      message: 'Đã phê duyệt phản hồi thành công',
      reviewId,
      response,
    })
  } catch (error) {
    console.error('Lỗi phê duyệt:', error)
    return NextResponse.json(
      { error: 'Không thể phê duyệt phản hồi, vui lòng thử lại' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const reviewId = searchParams.get('reviewId')
  
  if (reviewId && approvedResponses[reviewId]) {
    return NextResponse.json({ response: approvedResponses[reviewId].response })
  }
  
  return NextResponse.json({ responses: approvedResponses })
}