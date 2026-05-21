'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, TrendingUp, BarChart3, Clock, CheckCircle, Zap, BookOpen, Target, Award } from 'lucide-react'

export default function AILearningPage() {
  const [metrics] = useState({
    accuracy: 94,
    trainingProgress: 78,
    samplesProcessed: 12500,
    lastUpdated: '2024-01-15'
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-7 h-7 text-purple-400" />
          AI Learning & Training
        </h1>
        <p className="text-slate-400 mt-1">Hệ thống học tập và cải thiện AI liên tục</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 bg-slate-800/30 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-green-400" />
            <p className="text-sm text-slate-400">Độ chính xác</p>
          </div>
          <p className="text-3xl font-bold text-white">{metrics.accuracy}%</p>
        </div>
        <div className="p-5 bg-slate-800/30 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <p className="text-sm text-slate-400">Tiến độ training</p>
          </div>
          <p className="text-3xl font-bold text-white">{metrics.trainingProgress}%</p>
        </div>
        <div className="p-5 bg-slate-800/30 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-5 h-5 text-yellow-400" />
            <p className="text-sm text-slate-400">Mẫu đã học</p>
          </div>
          <p className="text-3xl font-bold text-white">{metrics.samplesProcessed.toLocaleString()}</p>
        </div>
        <div className="p-5 bg-slate-800/30 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-purple-400" />
            <p className="text-sm text-slate-400">Cập nhật cuối</p>
          </div>
          <p className="text-xl font-bold text-white">{metrics.lastUpdated}</p>
        </div>
      </div>

      <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-400" />
          Training Progress
        </h3>
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-400">Model Performance</span>
            <span className="text-purple-400">{metrics.accuracy}%</span>
          </div>
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${metrics.accuracy}%` }}
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            />
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-slate-300">Sentiment Analysis Model</span>
            </div>
            <span className="text-green-400">Active</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-slate-300">Response Generation</span>
            </div>
            <span className="text-yellow-400">Training</span>
          </div>
        </div>
      </div>
    </div>
  )
}