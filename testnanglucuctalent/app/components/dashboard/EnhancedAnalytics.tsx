// app/components/dashboard/EnhancedAnalytics.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, TrendingDown, Star, MessageCircle, Users, 
  Clock, Brain, AlertTriangle, Download, Calendar,
  ChevronLeft, ChevronRight, BarChart3, PieChart
} from 'lucide-react'

interface AnalyticsData {
  overview: {
    totalReviews: number
    avgRating: number
    responseRate: number
    aiSuggestions: number
    monthlyGrowth: number
  }
  trends: {
    date: string
    reviews: number
    rating: number
    responses: number
  }[]
  topKeywords: { word: string; count: number; sentiment: string }[]
  performance: {
    avgResponseTime: number
    responseTimeTrend: number
    customerSatisfaction: number
    csatTrend: number
  }
}

export default function EnhancedAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [dateRange, setDateRange] = useState('7d')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [dateRange])

  const fetchAnalytics = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setData({
      overview: {
        totalReviews: 1234,
        avgRating: 4.6,
        responseRate: 92,
        aiSuggestions: 156,
        monthlyGrowth: 12,
      },
      trends: [
        { date: 'Mon', reviews: 45, rating: 4.5, responses: 42 },
        { date: 'Tue', reviews: 52, rating: 4.6, responses: 48 },
        { date: 'Wed', reviews: 48, rating: 4.4, responses: 45 },
        { date: 'Thu', reviews: 61, rating: 4.7, responses: 58 },
        { date: 'Fri', reviews: 55, rating: 4.5, responses: 52 },
        { date: 'Sat', reviews: 38, rating: 4.8, responses: 36 },
        { date: 'Sun', reviews: 42, rating: 4.6, responses: 40 },
      ],
      topKeywords: [
        { word: 'service', count: 234, sentiment: 'positive' },
        { word: 'quality', count: 189, sentiment: 'positive' },
        { word: 'wait', count: 145, sentiment: 'negative' },
        { word: 'friendly', count: 132, sentiment: 'positive' },
        { word: 'price', count: 98, sentiment: 'neutral' },
      ],
      performance: {
        avgResponseTime: 2.3,
        responseTimeTrend: -0.7,
        customerSatisfaction: 4.6,
        csatTrend: 0.3,
      },
    })
    setLoading(false)
  }

  if (loading || !data) {
    return (
      <div className="space-y-6">
        <div className="h-32 bg-slate-700/20 rounded-xl animate-pulse" />
        <div className="h-64 bg-slate-700/20 rounded-xl animate-pulse" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
        <div className="flex gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-slate-800/30 rounded-xl border border-slate-700"
        >
          <div className="flex items-center justify-between mb-3">
            <MessageCircle className="w-5 h-5 text-blue-400" />
            <span className={`text-xs flex items-center gap-1 ${data.overview.monthlyGrowth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {data.overview.monthlyGrowth >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {Math.abs(data.overview.monthlyGrowth)}%
            </span>
          </div>
          <p className="text-3xl font-bold text-white">{data.overview.totalReviews.toLocaleString()}</p>
          <p className="text-sm text-slate-400 mt-1">Total Reviews</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 bg-slate-800/30 rounded-xl border border-slate-700"
        >
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-2xl font-bold text-white">{data.overview.avgRating}</span>
          </div>
          <p className="text-sm text-slate-400">Average Rating</p>
          <div className="mt-2 flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < Math.floor(data.overview.avgRating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'}`} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 bg-slate-800/30 rounded-xl border border-slate-700"
        >
          <div className="flex items-center justify-between mb-3">
            <Clock className="w-5 h-5 text-green-400" />
            <span className="text-xs text-green-400">-0.7s</span>
          </div>
          <p className="text-3xl font-bold text-white">{data.performance.avgResponseTime}s</p>
          <p className="text-sm text-slate-400 mt-1">Avg Response Time</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 bg-slate-800/30 rounded-xl border border-slate-700"
        >
          <div className="flex items-center gap-2 mb-3">
            <Brain className="w-5 h-5 text-purple-400" />
            <span className="text-2xl font-bold text-white">{data.overview.aiSuggestions}</span>
          </div>
          <p className="text-sm text-slate-400">AI Suggestions Used</p>
        </motion.div>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Review Trends Chart */}
        <div className="lg:col-span-2 p-6 bg-slate-800/30 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Review Trends</h3>
          <div className="h-64 relative">
            <div className="absolute inset-0 flex items-end justify-between gap-2">
              {data.trends.map((trend, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center gap-1">
                    <div 
                      className="w-full bg-blue-500/50 rounded-t-lg transition-all duration-500"
                      style={{ height: `${(trend.reviews / 70) * 100}px` }}
                    />
                    <div 
                      className="w-full bg-green-500/50 rounded-t-lg transition-all duration-500"
                      style={{ height: `${(trend.responses / 70) * 100}px` }}
                    />
                  </div>
                  <span className="text-xs text-slate-400">{trend.date}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded" />
              <span className="text-xs text-slate-400">Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded" />
              <span className="text-xs text-slate-400">Responses</span>
            </div>
          </div>
        </div>

        {/* Top Keywords */}
        <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Top Keywords</h3>
          <div className="space-y-3">
            {data.topKeywords.map((keyword, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    keyword.sentiment === 'positive' ? 'bg-green-500' :
                    keyword.sentiment === 'negative' ? 'bg-red-500' : 'bg-yellow-500'
                  }`} />
                  <span className="text-slate-300">{keyword.word}</span>
                </div>
                <span className="text-white font-semibold">{keyword.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Response Performance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-400">Response Rate</span>
                <span className="text-sm font-semibold text-white">{data.overview.responseRate}%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${data.overview.responseRate}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-400">Customer Satisfaction</span>
                <span className="text-sm font-semibold text-white">{data.performance.customerSatisfaction}/5</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${(data.performance.customerSatisfaction / 5) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">AI Impact</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">80%</p>
              <p className="text-xs text-slate-400">Time Saved</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">94%</p>
              <p className="text-xs text-slate-400">AI Accuracy</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-400">87%</p>
              <p className="text-xs text-slate-400">Approval Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-400">24/7</p>
              <p className="text-xs text-slate-400">Availability</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}