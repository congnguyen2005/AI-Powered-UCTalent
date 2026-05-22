'use client'

import { Bell, Mail, MessageSquare, AlertTriangle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function NotificationSettingsPage() {
  const handleSave = () => toast.success('Đã lưu cài đặt thông báo')

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><Bell className="w-7 h-7 text-yellow-400" /> Cài đặt thông báo</h1><p className="text-slate-400 mt-1">Cấu hình nhận thông báo</p></div>
      <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700 space-y-4">
        <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg"><div className="flex items-center gap-2"><Mail className="w-4 h-4 text-blue-400" /><div><p className="text-white">Email notifications</p><p className="text-xs text-slate-400">Nhận thông báo qua email</p></div></div><label className="relative inline-flex cursor-pointer"><input type="checkbox" defaultChecked className="sr-only peer" /><div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition peer-checked:bg-blue-600"></div></label></div>
        <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg"><div className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-red-400" /><div><p className="text-white">Crisis alerts</p><p className="text-xs text-slate-400">Cảnh báo khủng hoảng</p></div></div><label className="relative inline-flex cursor-pointer"><input type="checkbox" defaultChecked className="sr-only peer" /><div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition peer-checked:bg-blue-600"></div></label></div>
        <div className="flex justify-end"><button onClick={handleSave} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium">Lưu cài đặt</button></div>
      </div>
    </div>
  )
}