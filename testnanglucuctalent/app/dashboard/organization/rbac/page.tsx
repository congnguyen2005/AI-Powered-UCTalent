'use client'

import { Shield, CheckCircle, XCircle, Edit3 } from 'lucide-react'

export default function RBACPage() {
  const permissions = [
    { action: 'Xem dashboard', admin: true, manager: true, staff: true },
    { action: 'Xem review', admin: true, manager: true, staff: true },
    { action: 'Phản hồi review', admin: true, manager: true, staff: false },
    { action: 'Duyệt phản hồi AI', admin: true, manager: true, staff: false },
    { action: 'Cấu hình AI', admin: true, manager: false, staff: false },
    { action: 'Quản lý nhân viên', admin: true, manager: false, staff: false },
    { action: 'Xem báo cáo', admin: true, manager: true, staff: false },
    { action: 'Xuất dữ liệu', admin: true, manager: true, staff: false },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Shield className="w-7 h-7 text-purple-400" />
          Phân quyền & RBAC
        </h1>
        <p className="text-slate-400 mt-1">Cấu hình quyền truy cập cho từng vai trò</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-700">
            <tr className="text-left text-slate-400 text-sm">
              <th className="pb-3">Chức năng</th>
              <th className="pb-3 text-center">Admin</th>
              <th className="pb-3 text-center">Manager</th>
              <th className="pb-3 text-center">Staff</th>
              <th className="pb-3"></th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((perm, idx) => (
              <tr key={idx} className="border-b border-slate-700/50">
                <td className="py-3 text-white">{perm.action}</td>
                <td className="py-3 text-center">
                  {perm.admin ? <CheckCircle className="w-5 h-5 text-green-400 mx-auto" /> : <XCircle className="w-5 h-5 text-red-400 mx-auto" />}
                </td>
                <td className="py-3 text-center">
                  {perm.manager ? <CheckCircle className="w-5 h-5 text-green-400 mx-auto" /> : <XCircle className="w-5 h-5 text-red-400 mx-auto" />}
                </td>
                <td className="py-3 text-center">
                  {perm.staff ? <CheckCircle className="w-5 h-5 text-green-400 mx-auto" /> : <XCircle className="w-5 h-5 text-red-400 mx-auto" />}
                </td>
                <td className="py-3">
                  <button className="p-1.5 hover:bg-slate-700 rounded-lg transition">
                    <Edit3 className="w-4 h-4 text-slate-400" />
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