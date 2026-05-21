import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/app/lib/auth'
import { supabaseAdmin } from '@/app/lib/supabase/server'
import { getCache, setCache } from '@/app/lib/cache'

// Mock data for demo mode
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
    platform: 'google'
  },
]

export async function GET(request: NextRequest) {
  try {
    const authUser = getAuthUser(request)
    if (!authUser) {
      return NextResponse.json(
        { error: 'Chưa đăng nhập' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const sentiment = searchParams.get('sentiment')
    const priority = searchParams.get('priority')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    const cacheKey = `reviews:${authUser.organizationId}:${sentiment}:${priority}:${limit}:${offset}`
    
    // Try to get from cache
    const cached = await getCache(cacheKey)
    if (cached) {
      return NextResponse.json(cached)
    }

    // Check if we should use demo mode
    const isDemoMode = !process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('supabase.co') || 
                       process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('your-project')
    
    let reviews = []
    let total = 0

    if (isDemoMode) {
      // Demo mode: use mock data
      let filtered = [...mockReviews]
      
      if (sentiment && sentiment !== 'all') {
        filtered = filtered.filter(r => r.sentiment === sentiment)
      }
      
      if (priority && priority !== 'all') {
        filtered = filtered.filter(r => r.priority === priority)
      }
      
      total = filtered.length
      reviews = filtered.slice(offset, offset + limit)
      
      console.log('📊 Using demo mode for reviews, returned:', reviews.length)
    } else {
      // Real database
      let query = supabaseAdmin
        .from('reviews')
        .select('*', { count: 'exact' })
        .eq('location_id', authUser.organizationId)
        .order('date', { ascending: false })
        .range(offset, offset + limit - 1)

      if (sentiment && sentiment !== 'all') {
        query = query.eq('sentiment', sentiment)
      }

      if (priority && priority !== 'all') {
        query = query.eq('priority', priority)
      }

      const { data, error, count } = await query

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      reviews = data || []
      total = count || 0
    }

    const result = {
      reviews,
      total,
      hasMore: offset + limit < total,
      pagination: { limit, offset }
    }

    // Cache the result
    await setCache(cacheKey, result, 300)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    
    // Fallback to mock data on error
    return NextResponse.json({
      reviews: mockReviews.slice(0, 10),
      total: mockReviews.length,
      hasMore: false,
      error: 'Using fallback mock data'
    }, { status: 200 })
  }
}