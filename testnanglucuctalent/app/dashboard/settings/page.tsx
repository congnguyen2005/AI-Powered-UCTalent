// app/dashboard/settings/page.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Settings,
  Building2,
  Users,
  Brain,
  Bell,
  CreditCard,
  Key,
  Shield,
  Globe,
  Palette,
  Save
} from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('organization')

  const tabs = [
    { id: 'profile', label: 'Hồ sơ', icon: Users },
    { id: 'organization', label: 'Tổ chức', icon: Building2 },
    { id: 'ai', label: 'AI Configuration', icon: Brain },
    { id: 'notifications', label: 'Thông báo', icon: Bell },
    { id: 'billing', label: 'Thanh toán', icon: CreditCard },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'security', label: 'Bảo mật', icon: Shield },
    { id: 'branding', label: 'Branding', icon: Palette },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Settings className="w-7 h-7 text-slate-400" />
          Cài đặt hệ thống
        </h1>
        <p className="text-slate-400 mt-1">Quản lý cấu hình tổ chức, AI và tài khoản</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <div className="w-64 shrink-0 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                  activeTab === tab.id
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6">
          {/* Organization Settings */}
          {activeTab === 'organization' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Thông tin tổ chức</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Tên công ty</label>
                    <input
                      type="text"
                      defaultValue="AI ORM Platform Demo"
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Mã số thuế</label>
                    <input
                      type="text"
                      defaultValue="0123456789"
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Địa chỉ</label>
                    <textarea
                      rows={3}
                      defaultValue="Tầng 10, Tòa nhà ABC, 123 Đường XYZ, Quận 1, TP.HCM"
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Brand Voice</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Giọng điệu thương hiệu</label>
                    <select className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500">
                      <option>Professional - Chuyên nghiệp</option>
                      <option>Friendly - Thân thiện</option>
                      <option>Luxury - Cao cấp</option>
                      <option>Youthful - Trẻ trung</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Từ khóa thương hiệu</label>
                    <input
                      type="text"
                      placeholder="chất lượng, uy tín, dịch vụ"
                      defaultValue="chất lượng, uy tín, chuyên nghiệp"
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Lưu thay đổi
                </button>
              </div>
            </motion.div>
          )}

          {/* AI Configuration */}
          {activeTab === 'ai' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-800/30 rounded-xl border border-slate-700"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Cấu hình AI</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Auto Response</p>
                    <p className="text-xs text-slate-400">Tự động gợi ý phản hồi cho review mới</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Sentiment Analysis</p>
                    <p className="text-xs text-slate-400">Phân tích cảm xúc khách hàng tự động</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">AI Model</label>
                  <select className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white">
                    <option>GPT-4o - High Quality</option>
                    <option>GPT-4o-mini - Balanced</option>
                    <option>GPT-3.5-turbo - Fast & Cheap</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">Temperature (Sáng tạo)</label>
                  <input type="range" min="0" max="1" step="0.1" defaultValue="0.7" className="w-full" />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>Chính xác</span>
                    <span>Sáng tạo</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}