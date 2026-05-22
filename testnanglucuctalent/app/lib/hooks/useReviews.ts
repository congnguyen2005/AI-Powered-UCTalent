// app/lib/hooks/useReviews.ts
import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'

interface Review {
  id: string
  rating: number
  text: string
  author_name: string
  date: string
  sentiment: string
  priority: string
  status: string
  response?: string
}

interface UseReviewsOptions {
  sentiment?: string
  priority?: string
  search?: string
  limit?: number
}

export function useReviews(options: UseReviewsOptions = {}) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [hasMore, setHasMore] = useState(false)

  const fetchReviews = useCallback(async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const params = new URLSearchParams()
      if (options.sentiment && options.sentiment !== 'all') params.append('sentiment', options.sentiment)
      if (options.priority && options.priority !== 'all') params.append('priority', options.priority)
      if (options.search) params.append('search', options.search)
      if (options.limit) params.append('limit', options.limit.toString())

      const response = await fetch(`/api/reviews?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      
      setReviews(data.reviews || [])
      setTotal(data.total || 0)
      setHasMore(data.hasMore || false)
    } catch (error) {
      console.error('Error fetching reviews:', error)
      toast.error('Không thể tải đánh giá')
    } finally {
      setLoading(false)
    }
  }, [options.sentiment, options.priority, options.search, options.limit])

  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])

  const approveReview = useCallback(async (reviewId: string, response: string) => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/reviews/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reviewId, response }),
      })

      if (res.ok) {
        toast.success('Đã phê duyệt phản hồi!')
        fetchReviews()
        return true
      } else {
        toast.error('Không thể phê duyệt')
        return false
      }
    } catch (error) {
      toast.error('Đã xảy ra lỗi')
      return false
    }
  }, [fetchReviews])

  return {
    reviews,
    loading,
    total,
    hasMore,
    approveReview,
    refresh: fetchReviews,
  }
}