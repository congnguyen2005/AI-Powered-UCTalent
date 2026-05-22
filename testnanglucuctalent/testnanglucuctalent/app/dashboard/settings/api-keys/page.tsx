'use client'

import { Key, Plus, Copy, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function APIKeysPage() {
  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    toast.success('Đã sao chép API key')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><Key className="w-7 h-7 text-purple-400" /> API Keys</h1><p className="text-slate-400 mt-1">Quản lý khóa API cho tích hợp</p></div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Tạo API Key</button>
      </div>
      <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
        <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg"><div><p className="text-white font-medium">Production API Key</p><p className="text-xs text-slate-500">sk_live_xxxxxxxxxxxx</p></div><div className="flex gap-2"><button onClick={() => copyKey('sk_live_xxxxxxxxxxxx')} className="p-2 hover:bg-slate-700 rounded-lg"><Copy className="w-4 h-4 text-slate-400" /></button><button className="p-2 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-4 h-4 text-red-400" /></button></div></div>
      </div>
    </div>
  )
}