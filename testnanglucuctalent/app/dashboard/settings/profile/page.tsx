'use client'

import { useState } from 'react'
import { User, Mail, Phone, MapPin, Save, Camera } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: 'Admin Demo',
    email: 'admin@demo.com',
    phone: '0901 234 567',
    address: 'TP. Hồ Chí Minh',
    role: 'Super Admin'
  })

  const handleSave = () => {
    toast.success('Đã cập nhật thông tin')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <User className="w-7 h-7 text-blue-400" />
          Hồ sơ cá nhân
        </h1>
        <p className="text-slate-400 mt-1">Quản lý thông tin tài khoản</p>
      </div>

      <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
        <div className="flex items-center gap-6 mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-3xl text-white font-bold">AD</span>
            </div>
            <button className="absolute bottom-0 right-0 p-1.5 bg-slate-800 rounded-full border border-slate-600">
              <Camera className="w-3 h-3 text-slate-400" />
            </button>
          </div>
          <div>
            <p className="text-white font-semibold">{profile.name}</p>
            <p className="text-sm text-slate-400">{profile.role}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Họ tên</label>
            <input type="text" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Email</label>
            <input type="email" value={profile.email} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white opacity-60" disabled />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Số điện thoại</label>
            <input type="tel" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Địa chỉ</label>
            <input type="text" value={profile.address} onChange={(e) => setProfile({...profile, address: e.target.value})} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white" />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button onClick={handleSave} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium flex items-center gap-2">
            <Save className="w-4 h-4" /> Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  )
}