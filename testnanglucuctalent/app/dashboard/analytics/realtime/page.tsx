'use client'

import { useState, useEffect } from 'react'
import { Activity, TrendingUp, Users, MessageCircle, AlertTriangle } from 'lucide-react'

export default function RealtimeAnalytics() {
  const [liveStats, setLiveStats] = useState({
    currentReviews: 0,
    activeUsers: 0,
    sentiment: 0,
    alerts: 0
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats({
        currentReviews: Math.floor(Math.random() * 50),
        activeUsers: Math.floor(Math.random() * 20) + 5,
        sentiment: Math.floor(Math.random() * 30) + 70,
        alerts: Math.floor(Math.random() * 5)
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Activity className="w-7 h-7 text-green-400" />
          Realtime Analytics
        </h1>
        <p className="text-slate-400 mt-1">Phân tích theo thời gian thực</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 bg-slate-800/30 rounded-xl border border-slate-700">
          <p className="text-sm text-slate-400">Review mới</p>
          <p className="text-3xl font-bold text-white animate-pulse">{liveStats.currentReviews}</p>
        </div>
        <div className="p-5 bg-slate-800/30 rounded-xl border border-slate-700">
          <p className="text-sm text-slate-400">Đang truy cập</p>
          <p className="text-3xl font-bold text-blue-400">{liveStats.activeUsers}</p>
        </div>
        <div className="p-5 bg-slate-800/30 rounded-xl border border-slate-700">
          <p className="text-sm text-slate-400">Sentiment Score</p>
          <p className="text-3xl font-bold text-green-400">{liveStats.sentiment}%</p>
        </div>
        <div className="p-5 bg-slate-800/30 rounded-xl border border-slate-700">
          <p className="text-sm text-slate-400">Cảnh báo</p>
          <p className="text-3xl font-bold text-red-400">{liveStats.alerts}</p>
        </div>
      </div>

      <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-green-400">Live Data Stream Active</span>
        </div>
        <div className="h-64 bg-slate-900/50 rounded-lg flex items-center justify-center text-slate-400">
          Realtime Chart Here
        </div>
      </div>
    </div>
  )
}