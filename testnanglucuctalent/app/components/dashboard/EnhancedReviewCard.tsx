// app/components/dashboard/EnhancedReviewCard.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Edit3, AlertTriangle, Zap, Star, MessageCircle, ThumbsUp, ThumbsDown } from 'lucide-react'
import toast from 'react-hot-toast'

interface EnhancedReviewCardProps {
  review: {
    id: string
    rating: number
    text: string
    author: string
    date: string
    sentiment: 'positive' | 'neutral' | 'negative'
    priority: 'low' | 'medium' | 'high' | 'critical'
    sentiment_score?: number
    status?: string
  }
  onApprove?: (response: string) => void
  onReject?: () => void
}

const priorityConfig = {
  low: { color: 'blue', icon: Zap, label: 'Ưu tiên thấp' },
  medium: { color: 'yellow', icon: MessageCircle, label: 'Ưu tiên trung bình' },
  high: { color: 'orange', icon: AlertTriangle, label: 'Ưu tiên cao' },
  critical: { color: 'red', icon: AlertTriangle, label: '⚠️ NGUY CẤP' },
}

const sentimentConfig = {
  positive: { color: 'green', icon: ThumbsUp, label: 'Tích cực' },
  neutral: { color: 'gray', icon: MessageCircle, label: 'Trung tính' },
  negative: { color: 'red', icon: ThumbsDown, label: 'Tiêu cực' },
}

export default function EnhancedReviewCard({ review, onApprove, onReject }: EnhancedReviewCardProps) {
  const [showAI, setShowAI] = useState(false)
  const [aiResponses, setAiResponses] = useState<string[]>([])
  const [selectedResponse, setSelectedResponse] = useState('')
  const [loadingAI, setLoadingAI] = useState(false)
  const [editingResponse, setEditingResponse] = useState(false)
  const [customResponse, setCustomResponse] = useState('')

  const PriorityIcon = priorityConfig[review.priority]?.icon || AlertTriangle
  const SentimentIcon = sentimentConfig[review.sentiment]?.icon || MessageCircle

  const generateAIResponse = async () => {
    setLoadingAI(true)
    setShowAI(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/ai/generate-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          reviewId: review.id,
          reviewText: review.text,
          customOptions: { count: 3 }
        }),
      })
      const data = await response.json()
      if (data.responses && data.responses.length > 0) {
        setAiResponses(data.responses)
        setSelectedResponse(data.responses[0])
        toast.success('AI đã tạo phản hồi thành công!')
      } else {
        toast.error('AI không thể tạo phản hồi')
      }
    } catch (error) {
      console.error('Lỗi tạo phản hồi AI:', error)
      toast.error('Không thể kết nối AI')
    } finally {
      setLoadingAI(false)
    }
  }

  const handleApprove = () => {
    const responseToUse = editingResponse ? customResponse : selectedResponse
    if (responseToUse && onApprove) {
      onApprove(responseToUse)
      setShowAI(false)
      setAiResponses([])
      setEditingResponse(false)
    }
  }

  const handleReject = () => {
    setShowAI(false)
    setAiResponses([])
    setEditingResponse(false)
    if (onReject) onReject()
    toast.info('Đã từ chối phản hồi AI')
  }

  const formattedDate = new Date(review.date).toLocaleDateString('vi-VN')

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'critical': return 'border-red-500/50 bg-gradient-to-r from-red-500/10 to-red-600/5 shadow-lg shadow-red-500/10'
      case 'high': return 'border-orange-500/30 bg-orange-500/5'
      default: return 'border-slate-700 bg-slate-800/30'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-5 rounded-xl border transition-all ${getPriorityColor(review.priority)} backdrop-blur-sm`}
    >
      {/* Header với Avatar và Rating */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-base">
              {review.author?.charAt(0).toUpperCase() || 'A'}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-white font-semibold text-sm">{review.author || 'Khách hàng'}</span>
            </div>
            <p className="text-xs text-slate-500">{formattedDate}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <div className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${
            review.sentiment === 'positive' ? 'bg-green-500/20' :
            review.sentiment === 'negative' ? 'bg-red-500/20' : 'bg-slate-500/20'
          }`}>
            <SentimentIcon className="w-3 h-3" />
            {sentimentConfig[review.sentiment]?.label || 'Trung tính'}
          </div>
          <div className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${
            review.priority === 'critical' ? 'bg-red-500/20' :
            review.priority === 'high' ? 'bg-orange-500/20' :
            review.priority === 'medium' ? 'bg-yellow-500/20' : 'bg-blue-500/20'
          }`}>
            <PriorityIcon className="w-3 h-3" />
            {priorityConfig[review.priority]?.label || 'Ưu tiên thấp'}
          </div>
        </div>
      </div>

      {/* Nội dung đánh giá */}
      <p className="text-slate-300 mb-4 leading-relaxed text-sm">{review.text}</p>

      {/* Thanh điểm cảm xúc */}
      {review.sentiment_score && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Điểm cảm xúc</span>
            <span>{(review.sentiment_score * 100).toFixed(0)}%</span>
          </div>
          <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${review.sentiment_score * 100}%` }}
              className={`h-full rounded-full ${
                review.sentiment_score >= 0.6
                  ? 'bg-green-500'
                  : review.sentiment_score >= 0.4
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
            />
          </div>
        </div>
      )}

      {/* Nút tạo phản hồi AI */}
      {!showAI && !editingResponse && review.status !== 'approved' && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={generateAIResponse}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg text-sm font-medium transition-all flex items-center gap-2 shadow-md"
        >
          <Zap className="w-4 h-4" />
          Tạo phản hồi bằng AI
        </motion.button>
      )}

      {/* Hiển thị phản hồi đã duyệt */}
      {review.status === 'approved' && review.response && (
        <div className="mt-4 p-4 bg-green-600/10 rounded-lg border border-green-500/30">
          <p className="text-sm text-green-300 mb-2">✓ Đã phản hồi:</p>
          <p className="text-slate-300 text-sm">{review.response}</p>
        </div>
      )}

      {/* Khu vực hiển thị phản hồi AI */}
      <AnimatePresence>
        {(showAI || editingResponse) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-4"
          >
            {loadingAI ? (
              <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-slate-300 text-sm">AI đang soạn phản hồi...</p>
                </div>
              </div>
            ) : editingResponse ? (
              <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                <textarea
                  value={customResponse}
                  onChange={(e) => setCustomResponse(e.target.value)}
                  className="w-full p-3 bg-slate-900 rounded-lg text-white border border-slate-600 focus:border-blue-500 focus:outline-none text-sm"
                  rows={4}
                  placeholder="Viết phản hồi của bạn..."
                />
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => setEditingResponse(false)}
                    className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm transition"
                  >
                    Quay lại
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-300">Chọn phản hồi phù hợp:</p>
                  {aiResponses.map((response, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => setSelectedResponse(response)}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        selectedResponse === response
                          ? 'bg-blue-600/20 border-2 border-blue-500'
                          : 'bg-slate-800/50 border border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      <p className="text-slate-300 text-sm">{response}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    onClick={handleApprove}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Duyệt & Đăng
                  </button>
                  <button
                    onClick={() => setEditingResponse(true)}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition flex items-center gap-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    Chỉnh sửa
                  </button>
                  <button
                    onClick={handleReject}
                    className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded-lg text-sm font-medium transition flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Từ chối
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}