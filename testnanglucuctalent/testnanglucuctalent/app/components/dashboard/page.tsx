// app/dashboard/page.tsx (Enhanced)
'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/app/components/dashboard/DashboardLayout'
import EnhancedReviewCard from '@/app/components/dashboard/EnhancedReviewCard'
import EnhancedAIPanel from '@/app/components/dashboard/EnhancedAIPanel'
import EnhancedAnalytics from '@/app/components/dashboard/EnhancedAnalytics'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, BarChart3, Filter, Search, 
  Star, AlertTriangle, Clock, CheckCircle
} from 'lucide-react'

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
      setReviews(data.reviews || [])
      
      // Calculate stats
      const total = data.reviews?.length || 0
      const pending = data.reviews?.filter((r: any) => r.status === 'pending').length || 0
      const critical = data.reviews?.filter((r: any) => r.priority === 'critical').length || 0
      const resolved = data.reviews?.filter((r: any) => r.status === 'resolved').length || 0
      
      setStats({ total, pending, critical, resolved })
    } catch (error) {
      console.error('Failed to fetch reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (reviewId: string, response: string) => {
    try {
      const token = localStorage.getItem('token')
      await fetch('/api/reviews/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reviewId, response }),
      })
      fetchReviews() // Refresh
    } catch (error) {
      console.error('Failed to approve response:', error)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Reviews</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <MessageCircle className="w-8 h-8 text-blue-400 opacity-50" />
            </div>
          </div>
          <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400 opacity-50" />
            </div>
          </div>
          <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Critical</p>
                <p className="text-2xl font-bold text-red-400">{stats.critical}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400 opacity-50" />
            </div>
          </div>
          <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Resolved</p>
                <p className="text-2xl font-bold text-green-400">{stats.resolved}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400 opacity-50" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-slate-700">
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 font-medium transition flex items-center gap-2 ${
              activeTab === 'reviews'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            Reviews
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 font-medium transition flex items-center gap-2 ${
              activeTab === 'analytics'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Analytics
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'reviews' ? (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Reviews Feed */}
              <div className="lg:col-span-2 space-y-4">
                {/* Filters */}
                <div className="flex gap-2 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search reviews..."
                      value={filters.search}
                      onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                      className="w-full pl-9 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <select
                    value={filters.sentiment}
                    onChange={(e) => setFilters({ ...filters, sentiment: e.target.value })}
                    className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm"
                  >
                    <option value="all">All Sentiment</option>
                    <option value="positive">Positive</option>
                    <option value="neutral">Neutral</option>
                    <option value="negative">Negative</option>
                  </select>
                  <select
                    value={filters.priority}
                    onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                    className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm"
                  >
                    <option value="all">All Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                {/* Review Cards */}
                {loading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-48 bg-slate-700/20 rounded-xl animate-pulse" />
                    ))}
                  </div>
                ) : reviews.length === 0 ? (
                  <div className="text-center py-12 bg-slate-800/30 rounded-xl border border-slate-700">
                    <MessageCircle className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                    <p className="text-slate-400">No reviews found</p>
                  </div>
                ) : (
                  reviews.map((review) => (
                    <EnhancedReviewCard
                      key={review.id}
                      review={review}
                      onApprove={(response) => handleApprove(review.id, response)}
                    />
                  ))
                )}
              </div>

              {/* AI Panel */}
              <div>
                <EnhancedAIPanel />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <EnhancedAnalytics />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  )
}