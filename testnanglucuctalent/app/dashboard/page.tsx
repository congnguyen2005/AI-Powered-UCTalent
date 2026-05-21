'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/app/components/dashboard/DashboardLayout'
import EnhancedReviewCard from '@/app/components/dashboard/EnhancedReviewCard'
import EnhancedAIPanel from '@/app/components/dashboard/EnhancedAIPanel'
import EnhancedAnalytics from '@/app/components/dashboard/EnhancedAnalytics'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, BarChart3, Search, AlertTriangle, Clock, CheckCircle, Star } from 'lucide-react'
import toast from 'react-hot-toast'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('reviews')
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    sentiment: 'all',
    priority: 'all',
    search: '',
  })
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    critical: 0,
    resolved: 0,
  })

  useEffect(() => {
    fetchReviews()
  }, [filters])

  const fetchReviews = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const params = new URLSearchParams()
      if (filters.sentiment !== 'all') params.append('sentiment', filters.sentiment)
      if (filters.priority !== 'all') params.append('priority', filters.priority)
      
      const response = await fetch(`/api/reviews?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      
      let reviewsData = data.reviews || []
      // Lọc theo search
      if (filters.search) {
        reviewsData = reviewsData.filter((r: any) => 
          r.text.toLowerCase().includes(filters.search.toLowerCase()) ||
          r.author_name?.toLowerCase().includes(filters.search.toLowerCase())
        )
      }
      
      setReviews(reviewsData)
      
      // Tính toán thống kê
      const total = reviewsData.length
      const pending = reviewsData.filter((r: any) => r.status === 'pending').length
      const critical = reviewsData.filter((r: any) => r.priority === 'critical').length
      const resolved = reviewsData.filter((r: any) => r.status === 'resolved' || r.status === 'approved').length
      
      setStats({ total, pending, critical, resolved })
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
        fetchReviews() // Làm mới danh sách
      } else {
        toast.error('Không thể phê duyệt, vui lòng thử lại')
      }
    } catch (error) {
      console.error('Lỗi phê duyệt:', error)
      toast.error('Đã xảy ra lỗi')
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Thống kê */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl border border-blue-500/20 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Tổng đánh giá</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <MessageCircle className="w-8 h-8 text-blue-400 opacity-60" />
            </div>
          </div>
          <div className="p-4 bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 rounded-xl border border-yellow-500/20 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Chờ phản hồi</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400 opacity-60" />
            </div>
          </div>
          <div className="p-4 bg-gradient-to-br from-red-500/10 to-red-600/5 rounded-xl border border-red-500/20 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Nguy cấp</p>
                <p className="text-2xl font-bold text-red-400">{stats.critical}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400 opacity-60" />
            </div>
          </div>
          <div className="p-4 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-xl border border-green-500/20 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Đã xử lý</p>
                <p className="text-2xl font-bold text-green-400">{stats.resolved}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400 opacity-60" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-slate-800">
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-5 py-2.5 font-medium transition-all rounded-t-lg flex items-center gap-2 ${
              activeTab === 'reviews'
                ? 'bg-slate-800/50 text-blue-400 border-b-2 border-blue-500'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            Danh sách đánh giá
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-5 py-2.5 font-medium transition-all rounded-t-lg flex items-center gap-2 ${
              activeTab === 'analytics'
                ? 'bg-slate-800/50 text-blue-400 border-b-2 border-blue-500'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Phân tích & Báo cáo
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'reviews' ? (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Khu vực Review Feed */}
              <div className="lg:col-span-2 space-y-4">
                {/* Thanh lọc */}
                <div className="flex flex-wrap gap-3 p-4 bg-slate-900/50 rounded-xl border border-slate-800 backdrop-blur-sm">
                  <div className="flex-1 min-w-[180px] relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm đánh giá..."
                      value={filters.search}
                      onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                      className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>
                  <select
                    value={filters.sentiment}
                    onChange={(e) => setFilters({ ...filters, sentiment: e.target.value })}
                    className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm cursor-pointer"
                  >
                    <option value="all">Tất cả cảm xúc</option>
                    <option value="positive">Tích cực</option>
                    <option value="neutral">Trung tính</option>
                    <option value="negative">Tiêu cực</option>
                  </select>
                  <select
                    value={filters.priority}
                    onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                    className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm cursor-pointer"
                  >
                    <option value="all">Tất cả mức độ</option>
                    <option value="low">Thấp</option>
                    <option value="medium">Trung bình</option>
                    <option value="high">Cao</option>
                    <option value="critical">NGUY CẤP</option>
                  </select>
                </div>

                {/* Danh sách Review Cards */}
                {loading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-48 bg-slate-800/20 rounded-xl animate-pulse" />
                    ))}
                  </div>
                ) : reviews.length === 0 ? (
                  <div className="text-center py-16 bg-slate-900/30 rounded-xl border border-slate-800">
                    <Star className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-400">Chưa có đánh giá nào</p>
                    <p className="text-sm text-slate-500 mt-1">Hãy kết nối cửa hàng của bạn để bắt đầu</p>
                  </div>
                ) : (
                  reviews.map((review) => (
                    <EnhancedReviewCard
                      key={review.id}
                      review={{
                        ...review,
                        author: review.author_name,
                        text: review.text,
                      }}
                      onApprove={(response) => handleApprove(review.id, response)}
                    />
                  ))
                )}
              </div>

              {/* AI Panel bên phải */}
              <div className="lg:sticky lg:top-6 h-fit">
                <EnhancedAIPanel />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <EnhancedAnalytics />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  )
}