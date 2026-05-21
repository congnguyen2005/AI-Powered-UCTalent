'use client'

import { useState } from 'react'
import { Building2, MapPin, Plus, MoreVertical, Star, Phone, Mail } from 'lucide-react'

export default function BranchesPage() {
  const [branches] = useState([
    { id: 1, name: 'Chi nhánh Hồ Chí Minh', address: '123 Nguyễn Huệ, Quận 1', phone: '028 1234 5678', email: 'hcm@demo.com', rating: 4.8, status: 'active' },
    { id: 2, name: 'Chi nhánh Hà Nội', address: '456 Lê Lợi, Hoàn Kiếm', phone: '024 1234 5678', email: 'hanoi@demo.com', rating: 4.6, status: 'active' },
    { id: 3, name: 'Chi nhánh Đà Nẵng', address: '789 Bạch Đằng, Sơn Trà', phone: '0236 1234 5678', email: 'danang@demo.com', rating: 4.7, status: 'inactive' },
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-7 h-7 text-blue-400" />
            Quản lý chi nhánh
          </h1>
          <p className="text-slate-400 mt-1">Danh sách và cấu hình chi nhánh</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" /> Thêm chi nhánh
        </button>
      </div>

      <div className="grid gap-4">
        {branches.map((branch) => (
          <div key={branch.id} className="p-5 bg-slate-800/30 rounded-xl border border-slate-700">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{branch.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <p className="text-xs text-slate-400">{branch.address}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-500" />
                      <p className="text-xs text-slate-400">{branch.phone}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-slate-500" />
                      <p className="text-xs text-slate-400">{branch.email}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-medium">{branch.rating}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${branch.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {branch.status === 'active' ? 'Hoạt động' : 'Ngừng hoạt động'}
                  </span>
                </div>
                <button className="p-2 hover:bg-slate-700 rounded-lg transition">
                  <MoreVertical className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}