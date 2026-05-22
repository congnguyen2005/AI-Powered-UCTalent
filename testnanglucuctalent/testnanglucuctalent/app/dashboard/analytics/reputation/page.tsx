'use client'

import { Shield, Star, TrendingUp, Award } from 'lucide-react'

export default function ReputationScorePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Shield className="w-7 h-7 text-green-400" />
          Reputation Score
        </h1>
        <p className="text-slate-400 mt-1">Điểm số danh tiếng tổng thể</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-xl border border-green-500/30 text-center">
          <p className="text-6xl font-bold text-green-400">86</p>
          <p className="text-slate-400 mt-2">/100 - Tốt</p>
        </div>
        <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
          <p className="text-sm text-slate-400">Xu hướng</p>
          <p className="text-2xl font-bold text-green-400 flex items-center gap-2">+12% <TrendingUp className="w-5 h-5" /></p>
        </div>
        <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
          <p className="text-sm text-slate-400">Xếp hạng ngành</p>
          <p className="text-2xl font-bold text-white">Top 15%</p>
        </div>
      </div>

      <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Các yếu tố ảnh hưởng</h3>
        <div className="space-y-4">
          <div><div className="flex justify-between text-sm"><span>Chất lượng dịch vụ</span><span>92%</span></div><div className="h-2 bg-slate-700 rounded-full"><div className="h-full bg-green-500 rounded-full w-[92%]" /></div></div>
          <div><div className="flex justify-between text-sm"><span>Phản hồi khách hàng</span><span>85%</span></div><div className="h-2 bg-slate-700 rounded-full"><div className="h-full bg-blue-500 rounded-full w-[85%]" /></div></div>
          <div><div className="flex justify-between text-sm"><span>Độ tin cậy</span><span>78%</span></div><div className="h-2 bg-slate-700 rounded-full"><div className="h-full bg-yellow-500 rounded-full w-[78%]" /></div></div>
        </div>
      </div>
    </div>
  )
}