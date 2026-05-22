// app/components/dashboard/ReviewFilters.tsx
'use client'

import { Search, Filter, Calendar, Star, AlertTriangle } from 'lucide-react'
import { useState } from 'react'

interface ReviewFiltersProps {
  onFilterChange: (filters: any) => void
  initialFilters?: any
}

export function ReviewFilters({ onFilterChange, initialFilters = {} }: ReviewFiltersProps) {
  const [filters, setFilters] = useState({
    search: '',
    sentiment: 'all',
    priority: 'all',
    rating: 'all',
    dateRange: 'all',
    ...initialFilters,
  })

  const handleChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
      <div className="flex flex-wrap gap-3">
        {/* Search */}
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Tìm kiếm đánh giá..."
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>

        {/* Sentiment Filter */}
        <select
          value={filters.sentiment}
          onChange={(e) => handleChange('sentiment', e.target.value)}
          className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
        >
          <option value="all">Tất cả cảm xúc</option>
          <option value="positive">👍 Tích cực</option>
          <option value="neutral">😐 Trung tính</option>
          <option value="negative">👎 Tiêu cực</option>
        </select>

        {/* Priority Filter */}
        <select
          value={filters.priority}
          onChange={(e) => handleChange('priority', e.target.value)}
          className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
        >
          <option value="all">Tất cả mức độ</option>
          <option value="low">🟢 Thấp</option>
          <option value="medium">🟡 Trung bình</option>
          <option value="high">🟠 Cao</option>
          <option value="critical">🔴 Nguy cấp</option>
        </select>

        {/* Rating Filter */}
        <select
          value={filters.rating}
          onChange={(e) => handleChange('rating', e.target.value)}
          className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
        >
          <option value="all">Tất cả số sao</option>
          <option value="5">⭐⭐⭐⭐⭐ 5 sao</option>
          <option value="4">⭐⭐⭐⭐ 4 sao</option>
          <option value="3">⭐⭐⭐ 3 sao</option>
          <option value="2">⭐⭐ 2 sao</option>
          <option value="1">⭐ 1 sao</option>
        </select>

        {/* Date Range Filter */}
        <select
          value={filters.dateRange}
          onChange={(e) => handleChange('dateRange', e.target.value)}
          className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
        >
          <option value="all">Tất cả thời gian</option>
          <option value="today">Hôm nay</option>
          <option value="week">7 ngày qua</option>
          <option value="month">30 ngày qua</option>
          <option value="quarter">3 tháng qua</option>
        </select>
      </div>
    </div>
  )
}