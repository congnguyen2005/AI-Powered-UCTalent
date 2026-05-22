"use client";

import { Building2, Globe, Mail, Phone, MapPin, Save } from "lucide-react";
import toast from "react-hot-toast";

export default function OrgSettingsPage() {
  const handleSave = () => toast.success("Đã lưu cài đặt tổ chức");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Building2 className="w-7 h-7 text-blue-400" />
          Cài đặt tổ chức
        </h1>
        <p className="text-slate-400 mt-1">Thông tin doanh nghiệp</p>
      </div>

      <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700 space-y-4">
        <div>
          <label className="block text-sm text-slate-400 mb-2">
            Tên công ty
          </label>
          <input
            type="text"
            defaultValue="AI ORM Platform Demo"
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-2">
            Mã số thuế
          </label>
          <input
            type="text"
            defaultValue="0123456789"
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-2">
            Email liên hệ
          </label>
          <input
            type="email"
            defaultValue="contact@demo.com"
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-2">
            Số điện thoại
          </label>
          <input
            type="tel"
            defaultValue="1900 1234"
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-2">Địa chỉ</label>
          <textarea
            rows={3}
            defaultValue="Tầng 10, Tòa nhà ABC, TP.HCM"
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-2">Website</label>
          <input
            type="url"
            defaultValue="https://demo.com"
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}
