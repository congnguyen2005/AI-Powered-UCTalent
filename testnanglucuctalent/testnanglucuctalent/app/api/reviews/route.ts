// app/api/reviews/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/app/lib/auth'

// Mock data cho reviews
const mockReviews = [
  {
    id: '1',
    rating: 5,
    text: 'Dịch vụ tuyệt vời! Nhân viên thân thiện, phòng ốc sạch sẽ. Tôi sẽ quay lại.',
    author_name: 'Nguyễn Văn A',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    sentiment: 'positive',
    sentiment_score: 0.92,
    priority: 'low',
    status: 'pending',
    platform: 'google'
  },
  {
    id: '2',
    rating: 2,
    text: 'Phòng hơi cũ, điều hòa không mát. Phục vụ bữa sáng chậm. Cần cải thiện nhiều.',
    author_name: 'Trần Thị B',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    sentiment: 'negative',
    sentiment_score: 0.25,
    priority: 'high',
    status: 'pending',
    platform: 'google'
  },
  {
    id: '3',
    rating: 4,
    text: 'Vị trí đẹp, view biển tuyệt vời. Giá hơi cao so với chất lượng.',
    author_name: 'Lê Văn C',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    sentiment: 'neutral',
    sentiment_score: 0.55,
    priority: 'medium',
    status: 'pending',
    platform: 'facebook'
  },
  {
    id: '4',
    rating: 1,
    text: 'THẢM HỌA! Phòng bẩn, giường có rệp, nhân viên thô lỗ. Tôi sẽ đăng bài này lên các hội nhóm để mọi người biết!',
    author_name: 'Phạm Thị D',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    sentiment: 'negative',
    sentiment_score: 0.05,
    priority: 'critical',
    status: 'pending',
    platform: 'google'
  },
  {
    id: '5',
    rating: 5,
    text: 'Ăn sáng ngon, buffet đa dạng. Nhân viên lễ tân rất nhiệt tình hỗ trợ.',
    author_name: 'Hoàng Văn E',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    sentiment: 'positive',
    sentiment_score: 0.88,
    priority: 'low',
    status: 'approved',
    platform: 'google',
    response: 'Cảm ơn bạn đã tin tưởng sử dụng dịch vụ của chúng tôi!'
  },
]

export async function GET(request: NextRequest) {
  try {
    const authUser = getAuthUser(request)
    if (!authUser) {
      return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const sentiment = searchParams.get('sentiment')
    const priority = searchParams.get('priority')

    let filteredReviews = [...mockReviews]

    if (sentiment && sentiment !== 'all') {
      filteredReviews = filteredReviews.filter(r => r.sentiment === sentiment)
    }
    if (priority && priority !== 'all') {
      filteredReviews = filteredReviews.filter(r => r.priority === priority)
    }

    return NextResponse.json({ 
      reviews: filteredReviews,
      total: filteredReviews.length
    })
  } catch (error) {
    console.error('Lỗi lấy reviews:', error)
    return NextResponse.json(
      { error: 'Không thể tải danh sách đánh giá' },
      { status: 500 }
    )
  }
}