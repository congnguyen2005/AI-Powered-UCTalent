'use client'

import { useState } from 'react'
import { Users, Plus, MoreVertical, Mail, Shield, Star, Clock } from 'lucide-react'

export default function StaffPage() {
  const [staff] = useState([
    { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@demo.com', role: 'admin', status: 'active', reviews: 234, responseTime: 1.8 },
    { id: 2, name: 'Trần Thị B', email: 'tranthib@demo.com', role: 'manager', status: 'active', reviews: 189, responseTime: 2.1 },
    { id: 3, name: 'Lê Văn C', email: 'levanc@demo.com', role: 'staff', status: 'inactive', reviews: 56, responseTime: 3.2 },
  ])

  const getRoleBadge = (role: string) => {
    switch(role) {
      case 'admin': return 'bg-purple-500/20 text-purple-400'
      case 'manager': return 'bg-blue-500/20 text-blue-400'
      default: return 'bg-slate-500/20 text-slate-400'
    }
  }

  const getRoleText = (role: string) => {
    switch(role) {
      case 'admin': return 'Quản trị viên'
      case 'manager': return 'Quản lý'
      default: return 'Nhân viên'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="w-7 h-7 text-green-400" />
            Quản lý nhân viên
          </h1>
          <p className="text-slate-400 mt-1">Danh sách và phân quyền nhân viên</p>
        </div>
        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" /> Thêm nhân viên
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-700">
            <tr className="text-left text-slate-400 text-sm">
              <th className="pb-3">Nhân viên</th>
              <th className="pb-3">Email</th>
              <th className="pb-3">Vai trò</th>
              <th className="pb-3">Trạng thái</th>
              <th className="pb-3">Reviews</th>
              <th className="pb-3">TG phản hồi</th>
              <th className="pb-3"></th>
            </tr>
          </thead>
          <tbody>
            {staff.map((member) => (
              <tr key={member.id} className="border-b border-slate-700/50">
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
                      <span className="text-white text-sm font-medium">{member.name.charAt(0)}</span>
                    </div>
                    <span className="text-white">{member.name}</span>
                  </div>
                </td>
                <td className="py-3 text-slate-400 text-sm">{member.email}</td>
                <td className="py-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${getRoleBadge(member.role)}`}>
                    {getRoleText(member.role)}
                  </span>
                </td>
                <td className="py-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${member.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {member.status === 'active' ? 'Hoạt động' : 'Khóa'}
                  </span>
                </td>
                <td className="py-3 text-white">{member.reviews}</td>
                <td className="py-3 text-green-400">{member.responseTime}s</td>
                <td className="py-3">
                  <button className="p-2 hover:bg-slate-700 rounded-lg transition">
                    <MoreVertical className="w-4 h-4 text-slate-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}