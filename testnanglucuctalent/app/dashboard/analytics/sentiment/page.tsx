'use client'

import { TrendingUp, Smile, Meh, Frown, BarChart3 } from 'lucide-react'

export default function SentimentTrendsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-7 h-7 text-blue-400" />
          Sentiment Trends
        </h1>
        <p className="text-slate-400 mt-1">Xu hướng cảm xúc khách hàng</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Phân bố cảm xúc</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="flex items-center gap-2"><Smile className="w-4 h-4 text-green-400" /> Tích cực</span>
                <span className="text-green-400">75%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full"><div className="h-full bg-green-500 rounded-full w-[75%]" /></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="flex items-center gap-2"><Meh className="w-4 h-4 text-yellow-400" /> Trung tính</span>
                <span className="text-yellow-400">15%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full"><div className="h-full bg-yellow-500 rounded-full w-[15%]" /></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="flex items-center gap-2"><Frown className="w-4 h-4 text-red-400" /> Tiêu cực</span>
                <span className="text-red-400">10%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full"><div className="h-full bg-red-500 rounded-full w-[10%]" /></div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Theo thời gian</h3>
          <div className="h-64 flex items-center justify-center text-slate-400 border border-slate-700 rounded-lg">
            Sentiment Timeline Chart
          </div>
        </div>
      </div>
    </div>
  )
}