'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Clock, CheckCircle, Target, Activity, Zap } from 'lucide-react'

export default function AIPerformancePage() {
  const [metrics] = useState({
    responseTime: 2.3,
    accuracy: 94,
    approvalRate: 87,
    costSaved: 12500,
    dailyMetrics: [85, 88, 92, 90, 94, 93, 95]
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Activity className="w-7 h-7 text-blue-400" />
          AI Performance Dashboard
        </h1>
        <p className="text-slate-400 mt-1">Theo dõi hiệu suất hoạt động của AI</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 bg-slate-800/30 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-green-400" />
            <p className="text-sm text-slate-400">Thời gian phản hồi</p>
          </div>
          <p className="text-2xl font-bold text-white">{metrics.responseTime}s</p>
          <p className="text-xs text-green-400">-0.7s so với tuần trước</p>
        </div>
        <div className="p-5 bg-slate-800/30 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-blue-400" />
            <p className="text-sm text-slate-400">Độ chính xác</p>
          </div>
          <p className="text-2xl font-bold text-white">{metrics.accuracy}%</p>
          <p className="text-xs text-green-400">+5% so với tuần trước</p>
        </div>
        <div className="p-5 bg-slate-800/30 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-purple-400" />
            <p className="text-sm text-slate-400">Tỷ lệ duyệt</p>
          </div>
          <p className="text-2xl font-bold text-white">{metrics.approvalRate}%</p>
          <p className="text-xs text-green-400">+12% so với tuần trước</p>
        </div>
        <div className="p-5 bg-slate-800/30 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <p className="text-sm text-slate-400">Tiết kiệm chi phí</p>
          </div>
          <p className="text-2xl font-bold text-white">${metrics.costSaved.toLocaleString()}</p>
          <p className="text-xs text-green-400">mỗi tháng</p>
        </div>
      </div>

      <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-400" />
          Accuracy Trend (7 ngày)
        </h3>
        <div className="h-64 flex items-end justify-between gap-2">
          {metrics.dailyMetrics.map((value, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${value * 2}px` }}
                className="w-full bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-lg"
              />
              <span className="text-xs text-slate-400">Ngày {idx + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}