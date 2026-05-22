'use client'

import { useState } from 'react'
import { Brain, Save } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AISettingsPage() {
  const [settings, setSettings] = useState({
    autoResponse: true,
    sentimentAnalysis: true,
    crisisDetection: true,
    model: 'gpt-4o-mini',
    temperature: 0.7
  })

  const handleSave = () => toast.success('Đã lưu cấu hình AI')

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><Brain className="w-7 h-7 text-purple-400" /> Cấu hình AI</h1><p className="text-slate-400 mt-1">Tùy chỉnh hoạt động của AI</p></div>
      <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700 space-y-4">
        <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg"><div><p className="text-white">Auto Response</p><p className="text-xs text-slate-400">Tự động tạo phản hồi cho review mới</p></div><label className="relative inline-flex cursor-pointer"><input type="checkbox" checked={settings.autoResponse} onChange={(e) => setSettings({...settings, autoResponse: e.target.checked})} className="sr-only peer" /><div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition peer-checked:bg-blue-600"></div></label></div>
        <div><label className="block text-sm text-slate-400 mb-2">AI Model</label><select value={settings.model} onChange={(e) => setSettings({...settings, model: e.target.value})} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"><option value="gpt-4o">GPT-4o - High Quality</option><option value="gpt-4o-mini">GPT-4o-mini - Balanced</option></select></div>
        <div><label className="block text-sm text-slate-400 mb-2">Temperature (Sáng tạo)</label><input type="range" min="0" max="1" step="0.1" value={settings.temperature} onChange={(e) => setSettings({...settings, temperature: parseFloat(e.target.value)})} className="w-full" /><div className="flex justify-between text-xs text-slate-500"><span>Chính xác</span><span>Sáng tạo</span></div></div>
        <div className="flex justify-end"><button onClick={handleSave} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium flex items-center gap-2"><Save className="w-4 h-4" /> Lưu cấu hình</button></div>
      </div>
    </div>
  )
}