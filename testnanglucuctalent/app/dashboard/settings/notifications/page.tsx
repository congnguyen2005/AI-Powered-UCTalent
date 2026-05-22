// app/dashboard/settings/notifications/page.tsx - Nâng cấp
"use client";

import { useState } from "react";
import {
  Bell,
  Mail,
  MessageSquare,
  AlertTriangle,
  Zap,
  CheckCircle,
  Save,
  Globe,
  Smartphone,
} from "lucide-react";
import toast from "react-hot-toast";

export default function NotificationSettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    crisisAlerts: true,
    weeklyReport: true,
    aiResponseReady: true,
    reviewPending: true,
    pushNotifications: false,
  });

  const handleSave = () => toast.success("Đã lưu cài đặt thông báo");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Bell className="w-7 h-7 text-yellow-400" /> Cài đặt thông báo
        </h1>
        <p className="text-slate-400 mt-1">
          Cấu hình nhận thông báo qua các kênh khác nhau
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-400" /> Thông báo Email
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Email notifications</p>
                <p className="text-xs text-slate-400">
                  Nhận thông báo qua email
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      emailNotifications: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Báo cáo hàng tuần</p>
                <p className="text-xs text-slate-400">
                  Nhận báo cáo tổng hợp mỗi tuần
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.weeklyReport}
                  onChange={(e) =>
                    setSettings({ ...settings, weeklyReport: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">AI phản hồi sẵn sàng</p>
                <p className="text-xs text-slate-400">
                  Nhận thông báo khi AI tạo phản hồi mới
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.aiResponseReady}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      aiResponseReady: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" /> Cảnh báo & Ưu
            tiên
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Cảnh báo khủng hoảng</p>
                <p className="text-xs text-slate-400">
                  Nhận ngay khi phát hiện rủi ro
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.crisisAlerts}
                  onChange={(e) =>
                    setSettings({ ...settings, crisisAlerts: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition peer-checked:bg-red-600"></div>
              </label>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Review chờ xử lý</p>
                <p className="text-xs text-slate-400">
                  Nhắc nhở khi có review mới chưa phản hồi
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.reviewPending}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      reviewPending: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition peer-checked:bg-yellow-600"></div>
              </label>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Push Notifications</p>
                <p className="text-xs text-slate-400">
                  Nhận thông báo trên trình duyệt
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.pushNotifications}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      pushNotifications: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <p className="text-white font-medium">
              Cài đặt thông báo của bạn đã được cập nhật
            </p>
            <p className="text-xs text-slate-400">
              Bạn sẽ nhận được thông báo qua các kênh đã chọn
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> Lưu cài đặt
        </button>
      </div>
    </div>
  );
}
