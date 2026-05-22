// app/dashboard/page.tsx - Nâng cấp trang tổng quan
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageCircle, BarChart3, Search, AlertTriangle, Clock, CheckCircle, Star,
  TrendingUp, TrendingDown, Users, Building2, Brain, Zap, Shield, Activity,
  RefreshCw, ChevronRight, ThumbsUp, ThumbsDown, Minus, Filter, Calendar,
  Download, Eye, Send, Edit3, Copy, Plus, MoreVertical, Phone, Mail, MapPin
} from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Mock data
const mockReviews = [
  { id: '1', rating: 5, text: 'Dịch vụ tuyệt vời! Nhân viên thân thiện, phòng ốc sạch sẽ. Tôi sẽ quay lại.', author_name: 'Nguyễn Văn A', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), sentiment: 'positive', sentiment_score: 0.92, priority: 'low', status: 'pending', platform: 'google', response: null },
  { id: '2', rating: 2, text: 'Phòng hơi cũ, điều hòa không mát. Phục vụ bữa sáng chậm. Cần cải thiện nhiều.', author_name: 'Trần Thị B', date: new Date(Date.now()  - 5 * 24 * 60 * 60 * 1000).toISOString(), sentiment: 'negative', sentiment_score: 0.25, priority: 'high', status: 'pending', platform: 'google', response: null },
  { id: '3', rating: 4, text: 'Vị trí đẹp, view biển tuyệt vời. Giá hơi cao so với chất lượng.', author_name: 'Lê Văn C', date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), sentiment: 'neutral', sentiment_score: 0.55, priority: 'medium', status: 'pending', platform: 'facebook', response: null },
  { id: '4', rating: 1, text: 'THẢM HỌA! Phòng bẩn, giường có rệp, nhân viên thô lỗ. Tôi sẽ đăng bài này lên các hội nhóm để mọi người biết!', author_name: 'Phạm Thị D', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), sentiment: 'negative', sentiment_score: 0.05, priority: 'critical', status: 'pending', platform: 'google', response: null },
  { id: '5', rating: 5, text: 'Ăn sáng ngon, buffet đa dạng. Nhân viên lễ tân rất nhiệt tình hỗ trợ.', author_name: 'Hoàng Văn E', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), sentiment: 'positive', sentiment_score: 0.88, priority: 'low', status: 'approved', platform: 'google', response: 'Cảm ơn bạn đã đánh giá tích cực! Chúng tôi rất vui khi được phục vụ bạn.' },
]

const sentimentTrendData = [
  { date: 'Thứ 2', positive: 65, neutral: 20, negative: 15 },
  { date: 'Thứ 3', positive: 70, neutral: 18, negative: 12 },
  { date: 'Thứ 4', positive: 68, neutral: 19, negative: 13 },
  { date: 'Thứ 5', positive: 72, neutral: 17, negative: 11 },
  { date: 'Thứ 6', positive: 75, neutral: 15, negative: 10 },
  { date: 'Thứ 7', positive: 78, neutral: 14, negative: 8 },
  { date: 'Chủ nhật', positive: 80, neutral: 13, negative: 7 },
]

const reviewTrendData = [
  { date: 'Thứ 2', reviews: 45, responses: 42, rating: 4.5 },
  { date: 'Thứ 3', reviews: 52, responses: 48, rating: 4.6 },
  { date: 'Thứ 4', reviews: 48, responses: 45, rating: 4.4 },
  { date: 'Thứ 5', reviews: 61, responses: 58, rating: 4.7 },
  { date: 'Thứ 6', reviews: 55, responses: 52, rating: 4.5 },
  { date: 'Thứ 7', reviews: 38, responses: 36, rating: 4.8 },
  { date: 'Chủ nhật', reviews: 42, responses: 40, rating: 4.6 },
]

const branchData = [
  { name: 'HCM', reviews: 234, rating: 4.8, sentiment: 92 },
  { name: 'Hà Nội', reviews: 189, rating: 4.6, sentiment: 88 },
  { name: 'Đà Nẵng', reviews: 156, rating: 4.7, sentiment: 90 },
]

const teamData = [
  { name: 'Nguyễn Văn A', role: 'Admin', reviews: 234, responseTime: 1.8, approval: 95 },
  { name: 'Trần Thị B', role: 'Manager', reviews: 189, responseTime: 2.1, approval: 92 },
  { name: 'Lê Văn C', role: 'Staff', reviews: 156, responseTime: 2.5, approval: 88 },
]

const COLORS = { positive: '#22c55e', neutral: '#eab308', negative: '#ef4444' }

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('reviews')
  const [reviews, setReviews] = useState(mockReviews)
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({ sentiment: 'all', priority: 'all', search: '' })
  const [selectedReview, setSelectedReview] = useState<any>(null)
  const [aiResponses, setAiResponses] = useState<string[]>([])
  const [selectedResponse, setSelectedResponse] = useState('')
  const [generatingAI, setGeneratingAI] = useState(false)

  const stats = {
    totalReviews: reviews.length,
    avgRating: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
    pendingResponses: reviews.filter(r => r.status === 'pending').length,
    criticalAlerts: reviews.filter(r => r.priority === 'critical').length,
    resolvedCount: reviews.filter(r => r.status === 'approved').length,
    responseRate: reviews.length > 0 ? Math.round((reviews.filter(r => r.status === 'approved').length / reviews.length) * 100) : 0,
    monthlyGrowth: 12,
  }

  const sentimentDistribution = {
    positive: reviews.filter(r => r.sentiment === 'positive').length,
    neutral: reviews.filter(r => r.sentiment === 'neutral').length,
    negative: reviews.filter(r => r.sentiment === 'negative').length,
  }
  const totalSentiment = sentimentDistribution.positive + sentimentDistribution.neutral + sentimentDistribution.negative
  const sentimentPercent = {
    positive: totalSentiment > 0 ? Math.round((sentimentDistribution.positive / totalSentiment) * 100) : 0,
    neutral: totalSentiment > 0 ? Math.round((sentimentDistribution.neutral / totalSentiment) * 100) : 0,
    negative: totalSentiment > 0 ? Math.round((sentimentDistribution.negative / totalSentiment) * 100) : 0,
  }

  const generateAIResponse = async (review: any) => {
    setGeneratingAI(true)
    setSelectedReview(review)
    await new Promise(resolve => setTimeout(resolve, 1500))
    const responses = [
      `Cảm ơn ${review.author_name} đã dành thời gian đánh giá. Chúng tôi rất trân trọng phản hồi của bạn về "${review.text.slice(0, 50)}..." và sẽ ghi nhận để cải thiện dịch vụ.`,
      `Kính gửi anh/chị ${review.author_name}, cảm ơn đã chia sẻ trải nghiệm. Chúng tôi sẽ liên hệ trực tiếp để hỗ trợ tốt nhất.`,
      `Xin cảm ơn phản hồi của bạn. Đội ngũ của chúng tôi đã ghi nhận và sẽ có cải thiện trong thời gian tới.`
    ]
    setAiResponses(responses)
    setSelectedResponse(responses[0])
    setGeneratingAI(false)
  }

  const approveResponse = async (reviewId: string, response: string) => {
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, status: 'approved', response } : r))
    setSelectedReview(null)
    setAiResponses([])
    toast.success('Đã phê duyệt phản hồi!')
  }

  const filteredReviews = reviews.filter(r => {
    if (filters.sentiment !== 'all' && r.sentiment !== filters.sentiment) return false
    if (filters.priority !== 'all' && r.priority !== filters.priority) return false
    if (filters.search && !r.text.toLowerCase().includes(filters.search.toLowerCase()) && !r.author_name?.toLowerCase().includes(filters.search.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Bảng điều khiển</h1>
          <p className="text-slate-400 mt-1">Tổng quan hiệu suất và đánh giá khách hàng</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            7 ngày qua
          </button>
          <button className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm flex items-center gap-2">
            <Download className="w-4 h-4" />
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl border border-blue-500/20">
          <div className="flex items-center justify-between mb-2">
            <MessageCircle className="w-5 h-5 text-blue-400" />
            <span className="text-xs text-green-400">+{stats.monthlyGrowth}%</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.totalReviews}</p>
          <p className="text-xs text-slate-400">Tổng đánh giá</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 rounded-xl border border-yellow-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-2xl font-bold text-white">{stats.avgRating}</span>
          </div>
          <p className="text-xs text-slate-400">Đánh giá trung bình</p>
          <div className="flex gap-0.5 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < Math.floor(parseFloat(stats.avgRating)) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'}`} />
            ))}
          </div>
        </div>
        <div className="p-4 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-xl border border-green-500/20">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5 text-green-400" />
            <span className="text-xs text-green-400">+5%</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.responseRate}%</p>
          <p className="text-xs text-slate-400">Tỷ lệ phản hồi</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-orange-500/10 to-orange-600/5 rounded-xl border border-orange-500/20">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
          </div>
          <p className="text-2xl font-bold text-orange-400">{stats.pendingResponses}</p>
          <p className="text-xs text-slate-400">Chờ xử lý</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-red-500/10 to-red-600/5 rounded-xl border border-red-500/20">
          <AlertTriangle className="w-5 h-5 text-red-400 mb-2" />
          <p className="text-2xl font-bold text-red-400">{stats.criticalAlerts}</p>
          <p className="text-xs text-slate-400">Nguy cấp</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-xl border border-green-500/20">
          <CheckCircle className="w-5 h-5 text-green-400 mb-2" />
          <p className="text-2xl font-bold text-green-400">{stats.resolvedCount}</p>
          <p className="text-xs text-slate-400">Đã xử lý</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-800">
        <button onClick={() => setActiveTab('reviews')} className={`px-5 py-2.5 font-medium transition-all rounded-t-lg flex items-center gap-2 ${activeTab === 'reviews' ? 'bg-slate-800/50 text-blue-400 border-b-2 border-blue-500' : 'text-slate-400 hover:text-slate-200'}`}>
          <MessageCircle className="w-4 h-4" /> Danh sách đánh giá
        </button>
        <button onClick={() => setActiveTab('analytics')} className={`px-5 py-2.5 font-medium transition-all rounded-t-lg flex items-center gap-2 ${activeTab === 'analytics' ? 'bg-slate-800/50 text-blue-400 border-b-2 border-blue-500' : 'text-slate-400 hover:text-slate-200'}`}>
          <BarChart3 className="w-4 h-4" /> Phân tích & Báo cáo
        </button>
        <button onClick={() => setActiveTab('branches')} className={`px-5 py-2.5 font-medium transition-all rounded-t-lg flex items-center gap-2 ${activeTab === 'branches' ? 'bg-slate-800/50 text-blue-400 border-b-2 border-blue-500' : 'text-slate-400 hover:text-slate-200'}`}>
          <Building2 className="w-4 h-4" /> Chi nhánh
        </button>
        <button onClick={() => setActiveTab('team')} className={`px-5 py-2.5 font-medium transition-all rounded-t-lg flex items-center gap-2 ${activeTab === 'team' ? 'bg-slate-800/50 text-blue-400 border-b-2 border-blue-500' : 'text-slate-400 hover:text-slate-200'}`}>
          <Users className="w-4 h-4" /> Đội ngũ
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'reviews' && (
          <motion.div key="reviews" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Review List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-wrap gap-3 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
                <div className="flex-1 min-w-[180px] relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input type="text" placeholder="Tìm kiếm đánh giá..." value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm" />
                </div>
                <select value={filters.sentiment} onChange={(e) => setFilters({ ...filters, sentiment: e.target.value })} className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm">
                  <option value="all">Tất cả cảm xúc</option>
                  <option value="positive">👍 Tích cực</option>
                  <option value="neutral">😐 Trung tính</option>
                  <option value="negative">👎 Tiêu cực</option>
                </select>
                <select value={filters.priority} onChange={(e) => setFilters({ ...filters, priority: e.target.value })} className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm">
                  <option value="all">Tất cả mức độ</option>
                  <option value="low">🟢 Thấp</option>
                  <option value="medium">🟡 Trung bình</option>
                  <option value="high">🟠 Cao</option>
                  <option value="critical">🔴 Nguy cấp</option>
                </select>
              </div>

              {filteredReviews.length === 0 ? (
                <div className="text-center py-16 bg-slate-800/30 rounded-xl border border-slate-700">
                  <Star className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400">Chưa có đánh giá nào</p>
                  <p className="text-sm text-slate-500 mt-1">Hãy kết nối cửa hàng của bạn để bắt đầu</p>
                </div>
              ) : (
                filteredReviews.map((review, idx) => (
                  <motion.div key={review.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className={`p-5 rounded-xl border ${review.priority === 'critical' ? 'border-red-500/50 bg-gradient-to-r from-red-500/10 to-red-600/5' : review.priority === 'high' ? 'border-orange-500/30 bg-orange-500/5' : 'border-slate-700 bg-slate-800/30'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <span className="text-white font-bold text-base">{review.author_name?.charAt(0) || 'A'}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <div className="flex gap-0.5">{[...Array(5)].map((_, i) => (<Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'}`} />))}</div>
                            <span className="text-white font-semibold text-sm">{review.author_name}</span>
                          </div>
                          <p className="text-xs text-slate-500">{new Date(review.date).toLocaleDateString('vi-VN')}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${review.sentiment === 'positive' ? 'bg-green-500/20' : review.sentiment === 'negative' ? 'bg-red-500/20' : 'bg-slate-500/20'}`}>
                          {review.sentiment === 'positive' ? <ThumbsUp className="w-3 h-3" /> : review.sentiment === 'negative' ? <ThumbsDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                          {review.sentiment === 'positive' ? 'Tích cực' : review.sentiment === 'negative' ? 'Tiêu cực' : 'Trung tính'}
                        </div>
                        <div className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${review.priority === 'critical' ? 'bg-red-500/20' : review.priority === 'high' ? 'bg-orange-500/20' : review.priority === 'medium' ? 'bg-yellow-500/20' : 'bg-blue-500/20'}`}>
                          <AlertTriangle className="w-3 h-3" />
                          {review.priority === 'critical' ? 'NGUY CẤP' : review.priority === 'high' ? 'Cao' : review.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-300 mb-4 leading-relaxed text-sm">{review.text}</p>
                    
                    {review.status === 'approved' && review.response ? (
                      <div className="mt-4 p-4 bg-green-600/10 rounded-lg border border-green-500/30">
                        <p className="text-sm text-green-300 mb-2">✓ Đã phản hồi:</p>
                        <p className="text-slate-300 text-sm">{review.response}</p>
                      </div>
                    ) : selectedReview?.id === review.id && aiResponses.length > 0 ? (
                      <div className="mt-4 space-y-3">
                        {aiResponses.map((resp, i) => (
                          <div key={i} onClick={() => setSelectedResponse(resp)} className={`p-3 rounded-lg cursor-pointer transition-all ${selectedResponse === resp ? 'bg-blue-600/20 border-2 border-blue-500' : 'bg-slate-800/50 border border-slate-700'}`}>
                            <p className="text-slate-300 text-sm">{resp}</p>
                          </div>
                        ))}
                        <div className="flex gap-2 pt-2">
                          <button onClick={() => approveResponse(review.id, selectedResponse)} className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm font-medium transition flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Duyệt & Đăng</button>
                          <button onClick={() => { setSelectedReview(null); setAiResponses([]); }} className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded-lg text-sm font-medium transition"><XCircle className="w-4 h-4" /> Hủy</button>
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => generateAIResponse(review)} disabled={generatingAI} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg text-sm font-medium transition flex items-center gap-2">
                        {generatingAI && selectedReview?.id === review.id ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                        {generatingAI && selectedReview?.id === review.id ? 'AI đang tạo...' : 'Tạo phản hồi bằng AI'}
                      </button>
                    )}
                  </motion.div>
                ))
              )}
            </div>

            {/* AI Panel */}
            <div className="lg:sticky lg:top-6 h-fit space-y-4">
              <div className="p-5 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-500/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-blue-400" /><h3 className="text-base font-semibold text-white">Trung tâm chỉ huy AI</h3></div>
                  <RefreshCw className="w-4 h-4 text-slate-400 cursor-pointer hover:text-white transition" />
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-2.5 bg-white/5 rounded-lg"><div className="flex items-center justify-between mb-1"><Brain className="w-3.5 h-3.5 text-blue-400" /><span className="text-xs text-green-400">+5%</span></div><p className="text-xl font-bold text-white">94%</p><p className="text-xs text-slate-400">Độ chính xác AI</p></div>
                  <div className="p-2.5 bg-white/5 rounded-lg"><div className="flex items-center justify-between mb-1"><Clock className="w-3.5 h-3.5 text-green-400" /><span className="text-xs text-green-400">-0.7s</span></div><p className="text-xl font-bold text-white">2.3s</p><p className="text-xs text-slate-400">TG phản hồi TB</p></div>
                  <div className="p-2.5 bg-white/5 rounded-lg"><div className="flex items-center justify-between mb-1"><CheckCircle className="w-3.5 h-3.5 text-purple-400" /><span className="text-xs text-green-400">+12%</span></div><p className="text-xl font-bold text-white">87%</p><p className="text-xs text-slate-400">Tỷ lệ duyệt</p></div>
                  <div className="p-2.5 bg-white/5 rounded-lg"><div className="flex items-center justify-between mb-1"><AlertTriangle className="w-3.5 h-3.5 text-red-400" /><span className="text-xs text-green-400">-2</span></div><p className="text-xl font-bold text-white">0</p><p className="text-xs text-slate-400">Cảnh báo khủng hoảng</p></div>
                </div>
              </div>

              <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
                <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /> Phân tích cảm xúc</h4>
                <div className="space-y-2.5">
                  <div><div className="flex justify-between text-xs text-slate-400 mb-1"><span>Tích cực</span><span>{sentimentPercent.positive}%</span></div><div className="h-2 bg-slate-700 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${sentimentPercent.positive}%` }} className="h-full bg-green-500 rounded-full" /></div></div>
                  <div><div className="flex justify-between text-xs text-slate-400 mb-1"><span>Trung tính</span><span>{sentimentPercent.neutral}%</span></div><div className="h-2 bg-slate-700 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${sentimentPercent.neutral}%` }} className="h-full bg-yellow-500 rounded-full" /></div></div>
                  <div><div className="flex justify-between text-xs text-slate-400 mb-1"><span>Tiêu cực</span><span>{sentimentPercent.negative}%</span></div><div className="h-2 bg-slate-700 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${sentimentPercent.negative}%` }} className="h-full bg-red-500 rounded-full" /></div></div>
                </div>
              </div>

              <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
                <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2"><Activity className="w-4 h-4 text-purple-400" /> Hiệu suất AI</h4>
                <div className="space-y-3"><div className="flex justify-between"><span className="text-xs text-slate-400">Phản hồi đã tạo</span><span className="text-sm font-semibold text-white">164</span></div><div className="flex justify-between"><span className="text-xs text-slate-400">Tỷ lệ được duyệt</span><span className="text-sm font-semibold text-green-400">87%</span></div><div className="flex justify-between"><span className="text-xs text-slate-400">Chờ xem xét</span><span className="text-sm font-semibold text-yellow-400">5</span></div></div>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-600/10 rounded-lg border border-green-500/30"><div className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /><span className="text-xs text-green-300">AI đang hoạt động</span></div><Shield className="w-4 h-4 text-green-400" /></div>
            </div>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div key="analytics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            {/* Sentiment Trend Chart */}
            <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Xu hướng cảm xúc theo ngày</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sentimentTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="date" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                    <Legend />
                    <Area type="monotone" dataKey="positive" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} name="Tích cực" />
                    <Area type="monotone" dataKey="neutral" stackId="1" stroke="#eab308" fill="#eab308" fillOpacity={0.6} name="Trung tính" />
                    <Area type="monotone" dataKey="negative" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="Tiêu cực" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Review & Response Trends */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Đánh giá & Phản hồi</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={reviewTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="date" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                      <Legend />
                      <Bar dataKey="reviews" fill="#3b82f6" name="Đánh giá" />
                      <Bar dataKey="responses" fill="#22c55e" name="Phản hồi" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Điểm đánh giá trung bình</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={reviewTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="date" stroke="#94a3b8" />
                      <YAxis domain={[0, 5]} stroke="#94a3b8" />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                      <Legend />
                      <Line type="monotone" dataKey="rating" stroke="#eab308" strokeWidth={2} name="Điểm TB" dot={{ fill: '#eab308', strokeWidth: 2 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Reputation Score */}
            <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Shield className="w-5 h-5 text-green-400" /> Điểm danh tiếng tổng thể</h3>
              <div className="flex items-center gap-8 flex-wrap">
                <div className="text-center"><div className="text-6xl font-bold text-green-400">86</div><p className="text-slate-400">/100 - Tốt</p><p className="text-xs text-green-400 mt-2 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +12% so với tháng trước</p></div>
                <div className="flex-1 space-y-4">
                  <div><div className="flex justify-between text-sm"><span>Chất lượng dịch vụ</span><span>92%</span></div><div className="h-2 bg-slate-700 rounded-full"><div className="h-full bg-green-500 rounded-full w-[92%]" /></div></div>
                  <div><div className="flex justify-between text-sm"><span>Phản hồi khách hàng</span><span>85%</span></div><div className="h-2 bg-slate-700 rounded-full"><div className="h-full bg-blue-500 rounded-full w-[85%]" /></div></div>
                  <div><div className="flex justify-between text-sm"><span>Độ tin cậy</span><span>78%</span></div><div className="h-2 bg-slate-700 rounded-full"><div className="h-full bg-yellow-500 rounded-full w-[78%]" /></div></div>
                </div>
              </div>
            </div>

            {/* Top Keywords */}
            <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Từ khóa nổi bật</h3>
              <div className="flex flex-wrap gap-2">
                {['dịch vụ', 'chất lượng', 'nhân viên', 'phòng', 'vị trí', 'ăn sáng', 'giá', 'view', 'sạch sẽ', 'nhiệt tình'].map((keyword, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-slate-700/50 rounded-full text-sm text-slate-300">{keyword}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'branches' && (
          <motion.div key="branches" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {branchData.map((branch, idx) => (
              <div key={idx} className="p-5 bg-slate-800/30 rounded-xl border border-slate-700">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center"><MapPin className="w-5 h-5 text-blue-400" /></div><div><h3 className="font-semibold text-white">{branch.name}</h3><div className="flex items-center gap-2 mt-1"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /><span className="text-white text-sm">{branch.rating}</span><span className="text-xs text-slate-500">({branch.reviews} reviews)</span></div></div></div>
                  <span className="text-sm text-green-400">+15%</span>
                </div>
                <div><div className="flex justify-between text-sm mb-1"><span className="text-slate-400">Sentiment Score</span><span className="text-green-400">{branch.sentiment}%</span></div><div className="h-2 bg-slate-700 rounded-full"><div className="h-full bg-green-500 rounded-full" style={{ width: `${branch.sentiment}%` }} /></div></div>
              </div>
            ))}
            <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700 text-center"><Building2 className="w-12 h-12 text-slate-600 mx-auto mb-3" /><p className="text-slate-400">Quản lý chi nhánh</p><Link href="/dashboard/organization/branches" className="inline-block mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm">Quản lý chi nhánh</Link></div>
          </motion.div>
        )}

        {activeTab === 'team' && (
          <motion.div key="team" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="overflow-x-auto"><table className="w-full"><thead className="border-b border-slate-700"><tr className="text-left text-slate-400 text-sm"><th className="pb-3">Nhân viên</th><th className="pb-3">Vai trò</th><th className="pb-3">Reviews</th><th className="pb-3">TG phản hồi</th><th className="pb-3">Tỷ lệ duyệt</th></tr></thead><tbody>{teamData.map((member, idx) => (<tr key={idx} className="border-b border-slate-700/50"><td className="py-3 text-white">{member.name}</td><td className="py-3 text-slate-400">{member.role}</td><td className="py-3 text-white">{member.reviews}</td><td className="py-3 text-green-400">{member.responseTime}s</td><td className="py-3"><div className="flex items-center gap-2"><span className="text-white">{member.approval}%</span><div className="w-16 h-1.5 bg-slate-700 rounded-full"><div className="h-full bg-green-500 rounded-full" style={{ width: `${member.approval}%` }} /></div></div></td></tr>))}</tbody></table></div>
            <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700 text-center"><Users className="w-12 h-12 text-slate-600 mx-auto mb-3" /><p className="text-slate-400">Quản lý nhân viên và phân quyền</p><Link href="/dashboard/organization/staff" className="inline-block mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm">Quản lý nhân viên</Link></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Import missing icons
import { XCircle, Sparkles } from 'lucide-react'