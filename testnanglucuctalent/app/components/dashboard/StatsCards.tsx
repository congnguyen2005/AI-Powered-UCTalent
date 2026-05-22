// app/components/dashboard/StatsCards.tsx
'use client'

import { motion } from 'framer-motion'
import { Star, MessageCircle, Clock, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react'

interface StatsCardsProps {
  stats: {
    totalReviews: number
    avgRating: number
    responseRate: number
    pendingResponses: number
    criticalAlerts: number
    resolvedCount: number
    monthlyGrowth: number
  }
  loading?: boolean
}

export function StatsCards({ stats, loading }: StatsCardsProps) {
  const cards = [
    {
      title: 'Tổng đánh giá',
      value: stats.totalReviews.toLocaleString(),
      icon: MessageCircle,
      color: 'blue',
      change: `+${stats.monthlyGrowth}%`,
    },
    {
      title: 'Đánh giá trung bình',
      value: stats.avgRating.toFixed(1),
      icon: Star,
      color: 'yellow',
      suffix: '/5',
    },
    {
      title: 'Tỷ lệ phản hồi',
      value: `${stats.responseRate}%`,
      icon: Clock,
      color: 'green',
      change: '+5%',
    },
    {
      title: 'Chờ xử lý',
      value: stats.pendingResponses,
      icon: AlertTriangle,
      color: 'orange',
    },
    {
      title: 'Cảnh báo nguy cấp',
      value: stats.criticalAlerts,
      icon: AlertTriangle,
      color: 'red',
    },
    {
      title: 'Đã xử lý',
      value: stats.resolvedCount.toLocaleString(),
      icon: CheckCircle,
      color: 'green',
    },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-28 bg-slate-800/30 rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`p-4 bg-gradient-to-br from-${card.color}-500/10 to-${card.color}-600/5 rounded-xl border border-${card.color}-500/20 backdrop-blur-sm`}
          >
            <div className="flex items-center justify-between mb-2">
              <Icon className={`w-5 h-5 text-${card.color}-400`} />
              {card.change && (
                <span className="text-xs text-green-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {card.change}
                </span>
              )}
            </div>
            <p className="text-2xl font-bold text-white">
              {card.value}
              {card.suffix && <span className="text-sm text-slate-400 ml-1">{card.suffix}</span>}
            </p>
            <p className="text-xs text-slate-400 mt-1">{card.title}</p>
          </motion.div>
        )
      })}
    </div>
  )
}