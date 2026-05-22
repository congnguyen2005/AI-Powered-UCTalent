// app/dashboard/settings/ai/page.tsx - Nâng cấp
"use client";

import { useState } from "react";
import {
  Brain,
  Save,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  Volume2,
  Tag,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

export default function AISettingsPage() {
  const [settings, setSettings] = useState({
    autoResponse: true,
    sentimentAnalysis: true,
    crisisDetection: true,
    model: "gpt-4o-mini",
    temperature: 0.7,
    responseStyle: "professional",
  });

  const handleSave = () => toast.success("Đã lưu cấu hình AI");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Brain className="w-7 h-7 text-purple-400" /> Cấu hình AI
        </h1>
        <p className="text-slate-400 mt-1">
          Tùy chỉnh hoạt động của trí tuệ nhân tạo
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" /> Tính năng AI
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Auto Response</p>
                <p className="text-xs text-slate-400">
                  Tự động tạo phản hồi cho review mới
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoResponse}
                  onChange={(e) =>
                    setSettings({ ...settings, autoResponse: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Sentiment Analysis</p>
                <p className="text-xs text-slate-400">
                  Phân tích cảm xúc khách hàng
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.sentimentAnalysis}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      sentimentAnalysis: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Crisis Detection</p>
                <p className="text-xs text-slate-400">
                  Phát hiện khủng hoảng truyền thông
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.crisisDetection}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      crisisDetection: e.target.checked,
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
            <Volume2 className="w-5 h-5 text-blue-400" /> Giọng nói AI
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                AI Model
              </label>
              <select
                value={settings.model}
                onChange={(e) =>
                  setSettings({ ...settings, model: e.target.value })
                }
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              >
                <option value="gpt-4o">GPT-4o - Chất lượng cao nhất</option>
                <option value="gpt-4o-mini">GPT-4o-mini - Cân bằng</option>
                <option value="gpt-3.5-turbo">
                  GPT-3.5-turbo - Nhanh & Tiết kiệm
                </option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Phong cách phản hồi
              </label>
              <select
                value={settings.responseStyle}
                onChange={(e) =>
                  setSettings({ ...settings, responseStyle: e.target.value })
                }
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              >
                <option value="professional">Chuyên nghiệp</option>
                <option value="friendly">Thân thiện</option>
                <option value="empathetic">Đồng cảm</option>
                <option value="concise">Ngắn gọn</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Temperature (Độ sáng tạo): {settings.temperature}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.temperature}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    temperature: parseFloat(e.target.value),
                  })
                }
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>Chính xác</span>
                <span>Sáng tạo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Tag className="w-5 h-5 text-green-400" /> Từ khóa thương hiệu
        </h3>
        <div>
          <label className="block text-sm text-slate-400 mb-2">
            Từ khóa ưu tiên
          </label>
          <input
            type="text"
            placeholder="chất lượng, uy tín, chuyên nghiệp, dịch vụ"
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
          />
          <p className="text-xs text-slate-500 mt-2">
            Cách nhau bằng dấu phẩy. AI sẽ ưu tiên sử dụng các từ khóa này trong
            phản hồi.
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> Lưu cấu hình
        </button>
      </div>
    </div>
  );
}
