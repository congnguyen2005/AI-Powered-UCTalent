// app/dashboard/reviews/page.tsx (cập nhật)
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import EnhancedReviewCard from '@/app/components/dashboard/EnhancedReviewCard'
import EnhancedAIPanel from '@/app/components/dashboard/EnhancedAIPanel'
import { Search, Filter, Star, TrendingUp, AlertTriangle, Clock, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    sentiment: 'all',
    priority: 'all',
    search: '',
  })

  useEffect(() => {
    fetchReviews()
  }, [filters])

  const fetchReviews = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/reviews', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      
      let reviewsData = data.reviews || []
      if (filters.search) {
        reviewsData = reviewsData.filter((r: any) => 
          r.text.toLowerCase().includes(filters.search.toLowerCase()) ||
          r.author_name?.toLowerCase().includes(filters.search.toLowerCase())
        )
      }
      if (filters.sentiment !== 'all') {
        reviewsData = reviewsData.filter((r: any) => r.sentiment === filters.sentiment)
      }
      if (filters.priority !== 'all') {
        reviewsData = reviewsData.filter((r: any) => r.priority === filters.priority)
      }
      
      setReviews(reviewsData)
    } catch (error) {
      console.error('Lỗi tải review:', error)
      toast.error('Không thể tải danh sách đánh giá')
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (reviewId: string, response: string) => {
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
      } else {
        toast.error('Không thể phê duyệt')
      }
    } catch (error) {
      toast.error('Đã xảy ra lỗi')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Star className="w-7 h-7 text-yellow-400" />
          Quản lý đánh giá
        </h1>
        <p className="text-slate-400 mt-1">Xem, phân tích và phản hồi đánh giá khách hàng</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
          <p className="text-sm text-slate-400">Tổng số</p>
          <p className="text-2xl font-bold text-white">{reviews.length}</p>
        </div>
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
          <p className="text-sm text-slate-400">Chờ xử lý</p>
          <p className="text-2xl font-bold text-yellow-400">
            {reviews.filter(r => r.status === 'pending').length}
          </p>
        </div>
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
          <p className="text-sm text-slate-400">Nguy cấp</p>
          <p className="text-2xl font-bold text-red-400">
            {reviews.filter(r => r.priority === 'critical').length}
          </p>
        </div>
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
          <p className="text-sm text-slate-400">Đã xử lý</p>
          <p className="text-2xl font-bold text-green-400">
            {reviews.filter(r => r.status === 'approved').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Tìm kiếm đánh giá..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
        <select
          value={filters.sentiment}
          onChange={(e) => setFilters({ ...filters, sentiment: e.target.value })}
          className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
        >
          <option value="all">Tất cả cảm xúc</option>
          <option value="positive">Tích cực</option>
          <option value="neutral">Trung tính</option>
          <option value="negative">Tiêu cực</option>
        </select>
        <select
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
          className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
        >
          <option value="all">Tất cả mức độ</option>
          <option value="low">Thấp</option>
          <option value="medium">Trung bình</option>
          <option value="high">Cao</option>
          <option value="critical">Nguy cấp</option>
        </select>
      </div>

      {/* Review List */}
      <div className="space-y-4">
        {loading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="h-48 bg-slate-800/20 rounded-xl animate-pulse" />
          ))
        ) : reviews.length === 0 ? (
          <div className="text-center py-16 bg-slate-800/30 rounded-xl border border-slate-700">
            <Star className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">Chưa có đánh giá nào</p>
          </div>
        ) : (
          reviews.map((review) => (
            <EnhancedReviewCard
              key={review.id}
              review={{ ...review, author: review.author_name }}
              onApprove={(response) => handleApprove(review.id, response)}
            />
          ))
        )}
      </div>
    </div>
  )
}