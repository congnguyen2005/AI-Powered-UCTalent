// app/dashboard/analytics/page.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Star,
  MessageCircle,
  Users,
  Clock,
  Download,
  Calendar,
  Brain,
  Shield
} from 'lucide-react'

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('7d')

  const metrics = [
    { label: 'Total Reviews', value: '1,234', change: '+12%', icon: MessageCircle, color: 'blue' },
    { label: 'Avg Rating', value: '4.6', change: '+0.3', icon: Star, color: 'yellow' },
    { label: 'Response Rate', value: '92%', change: '+5%', icon: Clock, color: 'green' },
    { label: 'CSAT Score', value: '4.5', change: '+0.2', icon: Users, color: 'purple' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-blue-400" />
            Phân tích & Báo cáo
          </h1>
          <p className="text-slate-400 mt-1">Theo dõi hiệu suất, sentiment và reputation</p>
        </div>
        <div className="flex gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
          >
            <option value="7d">7 ngày qua</option>
            <option value="30d">30 ngày qua</option>
            <option value="90d">90 ngày qua</option>
          </select>
          <button className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm flex items-center gap-2">
            <Download className="w-4 h-4" />
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-5 bg-slate-800/30 rounded-xl border border-slate-700"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg bg-${metric.color}-500/10`}>
                  <Icon className={`w-5 h-5 text-${metric.color}-400`} />
                </div>
                <span className={`text-xs ${metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'} flex items-center gap-1`}>
                  {metric.change.startsWith('+') ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {metric.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-white">{metric.value}</p>
              <p className="text-sm text-slate-400 mt-1">{metric.label}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Trend */}
        <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Xu hướng cảm xúc</h3>
          <div className="h-64 flex items-center justify-center text-slate-400 border border-slate-700 rounded-lg">
            [Biểu đồ sentiment trend sẽ hiển thị tại đây]
          </div>
        </div>

        {/* Reputation Score */}
        <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-400" />
            Reputation Score
          </h3>
          <div className="text-center py-8">
            <div className="text-6xl font-bold text-green-400 mb-3">86</div>
            <p className="text-slate-400">/100 - Tốt</p>
            <div className="mt-6 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '86%' }} />
            </div>
          </div>
        </div>

        {/* Top Keywords */}
        <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Từ khóa nổi bật</h3>
          <div className="space-y-3">
            {['dịch vụ', 'chất lượng', 'nhân viên', 'phòng', 'vị trí'].map((keyword, idx) => (
              <div key={idx} className="flex items-center justify-between p-2">
                <span className="text-slate-300">{keyword}</span>
                <span className="text-white font-medium">{Math.floor(Math.random() * 200) + 50}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Performance */}
        <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            Hiệu suất AI
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Response Generation</span>
                <span className="text-green-400">94%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '94%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Sentiment Accuracy</span>
                <span className="text-green-400">91%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '91%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Approval Rate</span>
                <span className="text-blue-400">87%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '87%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}   