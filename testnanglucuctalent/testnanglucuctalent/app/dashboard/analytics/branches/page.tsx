'use client'

import { Building2, Star, TrendingUp, MapPin } from 'lucide-react'

export default function BranchAnalyticsPage() {
  const branches = [
    { name: 'Chi nhánh HCM', rating: 4.8, reviews: 234, sentiment: 92, growth: '+15%' },
    { name: 'Chi nhánh Hà Nội', rating: 4.6, reviews: 189, sentiment: 88, growth: '+12%' },
    { name: 'Chi nhánh Đà Nẵng', rating: 4.7, reviews: 156, sentiment: 90, growth: '+18%' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Building2 className="w-7 h-7 text-blue-400" />
          Branch Performance
        </h1>
        <p className="text-slate-400 mt-1">Hiệu suất theo từng chi nhánh</p>
      </div>

      <div className="grid gap-4">
        {branches.map((branch, idx) => (
          <div key={idx} className="p-5 bg-slate-800/30 rounded-xl border border-slate-700">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{branch.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-sm">{branch.rating}</span>
                    <span className="text-xs text-slate-500">({branch.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              <span className="text-sm text-green-400">{branch.growth}</span>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Sentiment Score</span>
                <span className="text-green-400">{branch.sentiment}%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${branch.sentiment}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}