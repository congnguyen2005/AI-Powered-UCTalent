// app/dashboard/ai/page.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Brain,
  MessageSquare,
  TrendingUp,
  Sparkles,
  BarChart3,
  Settings,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap
} from 'lucide-react'

export default function AICommandCenter() {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    { label: 'AI Responses Generated', value: '1,234', change: '+23%', icon: MessageSquare, color: 'blue' },
    { label: 'Avg Response Time', value: '2.3s', change: '-0.7s', icon: Clock, color: 'green' },
    { label: 'AI Accuracy', value: '94%', change: '+5%', icon: CheckCircle, color: 'purple' },
    { label: 'Approval Rate', value: '87%', change: '+12%', icon: TrendingUp, color: 'orange' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Brain className="w-7 h-7 text-blue-400" />
          AI Command Center
        </h1>
        <p className="text-slate-400 mt-1">Trung tâm điều khiển AI - Quản lý sentiment, response và learning</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-5 bg-slate-800/30 rounded-xl border border-slate-700"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg bg-${stat.color}-500/10`}>
                  <Icon className={`w-5 h-5 text-${stat.color}-400`} />
                </div>
                <span className={`text-xs ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-800">
        {['overview', 'sentiment', 'responses', 'learning', 'performance'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium transition rounded-t-lg ${
              activeTab === tab
                ? 'bg-slate-800/50 text-blue-400 border-b-2 border-blue-500'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Distribution */}
        <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Sentiment Distribution
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Tích cực</span>
                <span className="text-green-400">75%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Trung tính</span>
                <span className="text-yellow-400">15%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: '15%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Tiêu cực</span>
                <span className="text-red-400">10%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: '10%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* AI Status */}
        <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            AI System Status
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/30">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-green-300">Response Generator</span>
              </div>
              <span className="text-xs text-green-400">Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/30">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-green-300">Sentiment Analyzer</span>
              </div>
              <span className="text-xs text-green-400">Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                <span className="text-sm text-yellow-300">Learning Engine</span>
              </div>
              <span className="text-xs text-yellow-400">Training</span>
            </div>
          </div>
        </div>

        {/* Recent AI Activity */}
        <div className="lg:col-span-2 p-6 bg-slate-800/30 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            Recent AI Activity
          </h3>
          <div className="space-y-3">
            {[1, 2, 3].map((_, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">AI generated response for review #{idx + 1}</p>
                  <p className="text-xs text-slate-500 mt-1">2 minutes ago • Approved by Admin</p>
                </div>
                <CheckCircle className="w-4 h-4 text-green-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}