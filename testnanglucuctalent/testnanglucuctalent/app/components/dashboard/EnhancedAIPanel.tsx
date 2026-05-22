'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, TrendingUp, Clock, AlertTriangle, 
  CheckCircle, Zap, Activity, Shield, Sparkles, RefreshCw
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function EnhancedAIPanel() {
  const [stats, setStats] = useState({
    sentimentPositive: 75,
    sentimentNeutral: 15,
    sentimentNegative: 10,
    pendingResponses: 5,
    avgResponseTime: 2.3,
    crisisDetected: 0,
    aiAccuracy: 94,
    totalGenerated: 156,
    approvedRate: 87,
  })
  const [loading, setLoading] = useState(false)

  const metrics = [
    { label: 'Độ chính xác AI', value: `${stats.aiAccuracy}%`, change: '+5%', icon: Brain, color: 'blue', trend: 'up' },
    { label: 'TG phản hồi TB', value: `${stats.avgResponseTime}s`, change: '-0.7s', icon: Clock, color: 'green', trend: 'down' },
    { label: 'Tỷ lệ duyệt', value: `${stats.approvedRate}%`, change: '+12%', icon: CheckCircle, color: 'purple', trend: 'up' },
    { label: 'Cảnh báo khủng hoảng', value: stats.crisisDetected, change: '-2', icon: AlertTriangle, color: 'red', trend: 'down' },
  ]

  const refreshData = async () => {
    setLoading(true)
    // Giả lập lấy dữ liệu từ API
    await new Promise(resolve => setTimeout(resolve, 800))
    setStats(prev => ({
      ...prev,
      totalGenerated: prev.totalGenerated + Math.floor(Math.random() * 10),
    }))
    setLoading(false)
    toast.success('Đã cập nhật dữ liệu AI')
  }

  useEffect(() => {
    refreshData()
  }, [])

  return (
    <div className="space-y-4">
      {/* Header AI Command Center */}
      <div className="p-5 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-500/30 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <h3 className="text-base font-semibold text-white">Trung tâm chỉ huy AI</h3>
          </div>
          <button
            onClick={refreshData}
            disabled={loading}
            className="p-1.5 hover:bg-white/10 rounded-lg transition"
          >
            <RefreshCw className={`w-4 h-4 text-slate-400 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-2.5 bg-white/5 rounded-lg"
              >
                <div className="flex items-center justify-between mb-1">
                  <Icon className={`w-3.5 h-3.5 text-${metric.color}-400`} />
                  <span className={`text-xs ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    {metric.change}
                  </span>
                </div>
                <p className="text-xl font-bold text-white">{metric.value}</p>
                <p className="text-xs text-slate-400">{metric.label}</p>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Sentiment Distribution */}
      <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
        <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-green-400" />
          Phân tích cảm xúc
        </h4>
        <div className="space-y-2.5">
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Tích cực</span>
              <span>{stats.sentimentPositive}%</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stats.sentimentPositive}%` }}
                className="h-full bg-green-500 rounded-full"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Trung tính</span>
              <span>{stats.sentimentNeutral}%</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stats.sentimentNeutral}%` }}
                className="h-full bg-yellow-500 rounded-full"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Tiêu cực</span>
              <span>{stats.sentimentNegative}%</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stats.sentimentNegative}%` }}
                className="h-full bg-red-500 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* AI Performance Metrics */}
      <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
        <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Activity className="w-4 h-4 text-purple-400" />
          Hiệu suất AI
        </h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400">Phản hồi đã tạo</span>
            <span className="text-sm font-semibold text-white">{stats.totalGenerated}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400">Tỷ lệ được duyệt</span>
            <span className="text-sm font-semibold text-green-400">{stats.approvedRate}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400">Chờ xem xét</span>
            <span className="text-sm font-semibold text-yellow-400">{stats.pendingResponses}</span>
          </div>
        </div>
      </div>

      {/* Real-time Status */}
      <div className="flex items-center justify-between p-3 bg-green-600/10 rounded-lg border border-green-500/30">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-green-300">AI đang hoạt động</span>
        </div>
        <Shield className="w-4 h-4 text-green-400" />
      </div>
    </div>
  )
}