// app/api/analytics/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '../../lib/auth'
import { supabaseAdmin } from '../../lib/supabase/server'
import { getCache, setCache } from '../../lib/cache'

export async function GET(request: NextRequest) {
  try {
    const authUser = getAuthUser(request)
    if (!authUser) {
      return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '30d'
    const branchId = searchParams.get('branchId')

    const cacheKey = `analytics:${authUser.organizationId}:${period}:${branchId}`
    const cached = await getCache(cacheKey)
    if (cached) {
      return NextResponse.json(cached)
    }

    // Tính toán ngày bắt đầu
    const endDate = new Date()
    const startDate = new Date()
    if (period === '7d') startDate.setDate(startDate.getDate() - 7)
    else if (period === '30d') startDate.setDate(startDate.getDate() - 30)
    else if (period === '90d') startDate.setDate(startDate.getDate() - 90)
    else startDate.setDate(startDate.getDate() - 30)

    // Query analytics data
    let query = supabaseAdmin
      .from('analytics')
      .select('*')
      .eq('organization_id', authUser.organizationId)
      .gte('date', startDate.toISOString().split('T')[0])
      .lte('date', endDate.toISOString().split('T')[0])
      .order('date', { ascending: true })

    if (branchId && branchId !== 'all') {
      query = query.eq('branch_id', branchId)
    }

    const { data: analyticsData, error } = await query

    if (error) throw error

    // Tính toán tổng hợp
    const totalReviews = analyticsData?.reduce((sum, d) => sum + (d.total_reviews || 0), 0) || 0
    const avgRating = analyticsData?.reduce((sum, d) => sum + (d.avg_rating || 0), 0) / (analyticsData?.length || 1) || 0
    const positiveCount = analyticsData?.reduce((sum, d) => sum + (d.positive_count || 0), 0) || 0
    const neutralCount = analyticsData?.reduce((sum, d) => sum + (d.neutral_count || 0), 0) || 0
    const negativeCount = analyticsData?.reduce((sum, d) => sum + (d.negative_count || 0), 0) || 0
    const respondedCount = analyticsData?.reduce((sum, d) => sum + (d.responded_count || 0), 0) || 0
    const avgResponseTime = analyticsData?.reduce((sum, d) => sum + (d.avg_response_time_seconds || 0), 0) / (analyticsData?.length || 1) || 0

    const result = {
      summary: {
        totalReviews,
        avgRating: Number(avgRating.toFixed(2)),
        avgResponseTime: Number(avgResponseTime.toFixed(1)),
        responseRate: totalReviews > 0 ? Math.round((respondedCount / totalReviews) * 100) : 0,
        sentiment: {
          positive: totalReviews > 0 ? Math.round((positiveCount / totalReviews) * 100) : 0,
          neutral: totalReviews > 0 ? Math.round((neutralCount / totalReviews) * 100) : 0,
          negative: totalReviews > 0 ? Math.round((negativeCount / totalReviews) * 100) : 0,
        },
      },
      daily: analyticsData?.map(d => ({
        date: d.date,
        reviews: d.total_reviews,
        rating: d.avg_rating,
        responses: d.responded_count,
      })) || [],
      period,
    }

    await setCache(cacheKey, result, 300)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json({
      summary: {
        totalReviews: 0,
        avgRating: 0,
        avgResponseTime: 0,
        responseRate: 0,
        sentiment: { positive: 0, neutral: 0, negative: 0 },
      },
      daily: [],
    })
  }
}