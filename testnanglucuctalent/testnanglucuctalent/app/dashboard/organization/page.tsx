// app/dashboard/organization/page.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Building2,
  Users,
  Shield,
  Plus,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Star
} from 'lucide-react'

export default function OrganizationPage() {
  const [branches] = useState([
    { id: 1, name: 'Chi nhánh Hồ Chí Minh', address: '123 Nguyễn Huệ, Q1', rating: 4.8, reviews: 234, status: 'active' },
    { id: 2, name: 'Chi nhánh Hà Nội', address: '456 Lê Lợi, Hoàn Kiếm', rating: 4.6, reviews: 189, status: 'active' },
    { id: 3, name: 'Chi nhánh Đà Nẵng', address: '789 Bạch Đằng, Sơn Trà', rating: 4.7, reviews: 156, status: 'active' },
  ])

  const [staff] = useState([
    { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@demo.com', role: 'Admin', status: 'active', reviewsApproved: 234 },
    { id: 2, name: 'Trần Thị B', email: 'tranthib@demo.com', role: 'Manager', status: 'active', reviewsApproved: 189 },
    { id: 3, name: 'Lê Văn C', email: 'levanc@demo.com', role: 'Staff', status: 'active', reviewsApproved: 156 },
  ])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Building2 className="w-7 h-7 text-blue-400" />
          Tổ chức
        </h1>
        <p className="text-slate-400 mt-1">Quản lý chi nhánh, nhân viên và phân quyền</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-slate-800/30 rounded-xl border border-slate-700">
          <p className="text-sm text-slate-400 mb-1">Tổng chi nhánh</p>
          <p className="text-3xl font-bold text-white">{branches.length}</p>
        </div>
        <div className="p-5 bg-slate-800/30 rounded-xl border border-slate-700">
          <p className="text-sm text-slate-400 mb-1">Nhân viên</p>
          <p className="text-3xl font-bold text-white">{staff.length}</p>
        </div>
        <div className="p-5 bg-slate-800/30 rounded-xl border border-slate-700">
          <p className="text-sm text-slate-400 mb-1">Review đã xử lý</p>
          <p className="text-3xl font-bold text-white">1,234</p>
        </div>
      </div>

      {/* Branches Section */}
      <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-400" />
            Chi nhánh
          </h2>
          <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Thêm chi nhánh
          </button>
        </div>
        <div className="space-y-3">
          {branches.map((branch, idx) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 bg-slate-900/50 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-white">{branch.name}</p>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    {branch.address}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-medium">{branch.rating}</span>
                  </div>
                  <p className="text-xs text-slate-500">{branch.reviews} reviews</p>
                </div>
                <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                  <MoreVertical className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Staff Section */}
      <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-green-400" />
            Nhân viên
          </h2>
          <button className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Thêm nhân viên
          </button>
        </div>
        <div className="space-y-3">
          {staff.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 bg-slate-900/50 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
                  <span className="text-white font-medium">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-white">{member.name}</p>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                    <Mail className="w-3 h-3" />
                    {member.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    member.role === 'Admin' ? 'bg-purple-500/20 text-purple-400' :
                    member.role === 'Manager' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-slate-500/20 text-slate-400'
                  }`}>
                    {member.role}
                  </span>
                  <p className="text-xs text-slate-500 mt-1">{member.reviewsApproved} reviews</p>
                </div>
                <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                  <MoreVertical className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}