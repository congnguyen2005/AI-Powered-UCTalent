// app/lib/hooks/useAnalytics.ts
import { useState, useEffect, useCallback } from 'react'

interface AnalyticsData {
  summary: {
    totalReviews: number
    avgRating: number
    avgResponseTime: number
    responseRate: number
    sentiment: {
      positive: number
      neutral: number
      negative: number
    }
  }
  daily: Array<{
    date: string
    reviews: number
    rating: number
    responses: number
  }>
}

export function useAnalytics(period: string = '30d', branchId?: string) {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchAnalytics = useCallback(async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const params = new URLSearchParams({ period })
      if (branchId && branchId !== 'all') params.append('branchId', branchId)

      const response = await fetch(`/api/analytics?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }, [period, branchId])

  useEffect(() => {
    fetchAnalytics()
  }, [fetchAnalytics])

  return { data, loading, refresh: fetchAnalytics }
}