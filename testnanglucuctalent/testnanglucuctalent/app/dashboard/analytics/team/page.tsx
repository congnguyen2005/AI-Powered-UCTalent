'use client'

import { Users, Trophy, Clock, CheckCircle } from 'lucide-react'

export default function TeamAnalyticsPage() {
  const teamMembers = [
    { name: 'Nguyễn Văn A', role: 'Admin', reviews: 234, responseTime: 1.8, approval: 95 },
    { name: 'Trần Thị B', role: 'Manager', reviews: 189, responseTime: 2.1, approval: 92 },
    { name: 'Lê Văn C', role: 'Staff', reviews: 156, responseTime: 2.5, approval: 88 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Users className="w-7 h-7 text-green-400" />
          Team Performance
        </h1>
        <p className="text-slate-400 mt-1">Hiệu suất làm việc của đội ngũ</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-700">
            <tr className="text-left text-slate-400 text-sm">
              <th className="pb-3">Nhân viên</th>
              <th className="pb-3">Vai trò</th>
              <th className="pb-3">Reviews</th>
              <th className="pb-3">TG phản hồi</th>
              <th className="pb-3">Tỷ lệ duyệt</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member, idx) => (
              <tr key={idx} className="border-b border-slate-700/50">
                <td className="py-3 text-white">{member.name}</td>
                <td className="py-3 text-slate-400">{member.role}</td>
                <td className="py-3 text-white">{member.reviews}</td>
                <td className="py-3 text-green-400">{member.responseTime}s</td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-white">{member.approval}%</span>
                    <div className="w-16 h-1.5 bg-slate-700 rounded-full">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${member.approval}%` }} />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}