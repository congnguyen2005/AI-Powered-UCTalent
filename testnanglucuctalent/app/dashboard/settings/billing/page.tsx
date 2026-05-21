'use client'

import { CreditCard, CheckCircle, AlertCircle } from 'lucide-react'

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><CreditCard className="w-7 h-7 text-green-400" /> Thanh toán & Gói cước</h1><p className="text-slate-400 mt-1">Quản lý gói dịch vụ và thanh toán</p></div>
      <div className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-xl border border-green-500/30">
        <div className="flex justify-between items-start">
          <div><p className="text-sm text-slate-400">Gói hiện tại</p><p className="text-2xl font-bold text-white">Professional</p><p className="text-xs text-green-400 mt-1">✓ Đang hoạt động</p></div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm">Nâng cấp gói</button>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div><p className="text-xs text-slate-400">Hạn sử dụng</p><p className="text-white font-medium">15/04/2025</p></div>
          <div><p className="text-xs text-slate-400">Số dư</p><p className="text-white font-medium">$149 / tháng</p></div>
        </div>
      </div>
    </div>
  )
}