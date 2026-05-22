'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Volume2, Tag, Save, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function BrandVoicePage() {
  const [settings, setSettings] = useState({
    tone: 'professional',
    formality: 'formal',
    responseLength: 'medium',
    keywords: 'chất lượng, uy tín, chuyên nghiệp, dịch vụ',
    greeting: 'Kính gửi anh/chị',
    closing: 'Trân trọng cảm ơn'
  })

  const handleSave = () => {
    toast.success('Đã lưu cấu hình giọng nói thương hiệu')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Volume2 className="w-7 h-7 text-purple-400" />
          Brand Voice Configuration
        </h1>
        <p className="text-slate-400 mt-1">Cấu hình giọng nói AI theo phong cách thương hiệu</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            Giọng điệu
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Tone giọng nói</label>
              <select
                value={settings.tone}
                onChange={(e) => setSettings({ ...settings, tone: e.target.value })}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              >
                <option value="professional">Chuyên nghiệp</option>
                <option value="friendly">Thân thiện</option>
                <option value="luxury">Cao cấp</option>
                <option value="youthful">Trẻ trung</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Mức độ trang trọng</label>
              <select
                value={settings.formality}
                onChange={(e) => setSettings({ ...settings, formality: e.target.value })}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              >
                <option value="formal">Trang trọng</option>
                <option value="semi-formal">Bán trang trọng</option>
                <option value="casual">Thân mật</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Độ dài phản hồi</label>
              <select
                value={settings.responseLength}
                onChange={(e) => setSettings({ ...settings, responseLength: e.target.value })}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              >
                <option value="short">Ngắn gọn (1-2 câu)</option>
                <option value="medium">Trung bình (2-3 câu)</option>
                <option value="detailed">Chi tiết (3-5 câu)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Tag className="w-5 h-5 text-blue-400" />
            Từ khóa & Mẫu câu
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Từ khóa thương hiệu</label>
              <input
                type="text"
                value={settings.keywords}
                onChange={(e) => setSettings({ ...settings, keywords: e.target.value })}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                placeholder="chất lượng, uy tín, chuyên nghiệp"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Lời chào mặc định</label>
              <input
                type="text"
                value={settings.greeting}
                onChange={(e) => setSettings({ ...settings, greeting: e.target.value })}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Lời kết mặc định</label>
              <input
                type="text"
                value={settings.closing}
                onChange={(e) => setSettings({ ...settings, closing: e.target.value })}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Lưu cấu hình
        </button>
      </div>

      <div className="p-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/30">
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-400" />
          Preview
        </h3>
        <div className="p-4 bg-slate-900/50 rounded-lg">
          <p className="text-sm text-slate-400 mb-2">🎯 Ví dụ phản hồi AI:</p>
          <p className="text-slate-300 italic">
            "{settings.greeting}, cảm ơn bạn đã phản hồi. Chúng tôi luôn đề cao {settings.keywords.split(',')[0]} 
            và sẽ ghi nhận góp ý của bạn để hoàn thiện hơn. {settings.closing}."
          </p>
        </div>
      </div>
    </div>
  )
}