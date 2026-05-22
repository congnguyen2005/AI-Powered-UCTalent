// app/dashboard/settings/api-keys/page.tsx - Nâng cấp
"use client";

import { useState } from "react";
import {
  Key,
  Plus,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function APIKeysPage() {
  const [apiKeys, setApiKeys] = useState([
    {
      id: "1",
      name: "Production API Key",
      key: "sk_live_8x7f3k9m2n5p1q4r6s8t0u2v4w6x8y0z",
      keyPreview: "sk_live_8x7f3k9m2n...",
      createdAt: "2024-01-15",
      lastUsed: "2026-01-20T10:30:00Z",
      status: "active",
      permissions: ["read", "write", "delete"],
    },
    {
      id: "2",
      name: "Testing API Key",
      key: "sk_test_9y8g7h6j5k4l3m2n1p0q9r8s7t6u5v4w",
      keyPreview: "sk_test_9y8g7h6j5k...",
      createdAt: "2024-02-10",
      lastUsed: "2026-01-19T15:45:00Z",
      status: "active",
      permissions: ["read", "write"],
    },
  ]);
  const [showNewKeyForm, setShowNewKeyForm] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyPermissions, setNewKeyPermissions] = useState(["read"]);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [showFullKey, setShowFullKey] = useState<Record<string, boolean>>({});

  const generateApiKey = () =>
    "sk_live_" +
    Array(40)
      .fill(0)
      .map(
        () =>
          "abcdefghijklmnopqrstuvwxyz0123456789"[
            Math.floor(Math.random() * 36)
          ],
      )
      .join("");

  const handleCreateKey = () => {
    if (!newKeyName.trim()) {
      toast.error("Vui lòng nhập tên API Key");
      return;
    }
    const newKey = generateApiKey();
    setGeneratedKey(newKey);
    setApiKeys([
      {
        id: Date.now().toString(),
        name: newKeyName,
        key: newKey,
        keyPreview: newKey.slice(0, 20) + "...",
        createdAt: new Date().toISOString().split("T")[0],
        lastUsed: null,
        status: "active",
        permissions: newKeyPermissions,
      },
      ...apiKeys,
    ]);
    setNewKeyName("");
    setNewKeyPermissions(["read"]);
    toast.success("API Key đã được tạo!", { duration: 5000 });
  };

  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Đã sao chép ${name}`);
  };
  const toggleKeyStatus = (id: string) => {
    setApiKeys((prev) =>
      prev.map((key) =>
        key.id === id
          ? { ...key, status: key.status === "active" ? "inactive" : "active" }
          : key,
      ),
    );
    toast.success("Đã cập nhật trạng thái");
  };
  const deleteKey = (id: string, name: string) => {
    if (confirm(`Xóa API Key "${name}"?`)) {
      setApiKeys((prev) => prev.filter((key) => key.id !== id));
      toast.success("Đã xóa API Key");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Key className="w-7 h-7 text-purple-400" /> API Keys
          </h1>
          <p className="text-slate-400 mt-1">
            Quản lý khóa API cho tích hợp hệ thống
          </p>
        </div>
        <button
          onClick={() => setShowNewKeyForm(!showNewKeyForm)}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white text-sm font-medium flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Tạo API Key
        </button>
      </div>

      {showNewKeyForm && (
        <div className="p-6 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-xl border border-purple-500/30">
          <h3 className="text-lg font-semibold text-white mb-4">
            Tạo API Key mới
          </h3>
          {generatedKey ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                <p className="text-green-400 text-sm mb-2">
                  <CheckCircle className="w-4 h-4 inline mr-1" /> API Key đã
                  được tạo!
                </p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 p-3 bg-slate-900 rounded-lg text-green-400 text-sm font-mono break-all">
                    {generatedKey}
                  </code>
                  <button
                    onClick={() => copyToClipboard(generatedKey, "API Key")}
                    className="p-3 bg-slate-800 rounded-lg"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button
                onClick={() => {
                  setGeneratedKey(null);
                  setShowNewKeyForm(false);
                }}
                className="px-4 py-2 bg-slate-700 rounded-lg text-white"
              >
                Đóng
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="VD: Production API Key"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              />
              <div className="flex flex-wrap gap-3">
                {["read", "write", "delete"].map((perm) => (
                  <label key={perm} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newKeyPermissions.includes(perm as any)}
                      onChange={(e) => {
                        if (e.target.checked)
                          setNewKeyPermissions([
                            ...newKeyPermissions,
                            perm as any,
                          ]);
                        else
                          setNewKeyPermissions(
                            newKeyPermissions.filter((p) => p !== perm),
                          );
                      }}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-slate-300">
                      {perm === "read"
                        ? "Đọc"
                        : perm === "write"
                          ? "Ghi"
                          : "Xóa"}
                    </span>
                  </label>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleCreateKey}
                  className="px-4 py-2 bg-purple-600 rounded-lg text-white"
                >
                  Tạo Key
                </button>
                <button
                  onClick={() => setShowNewKeyForm(false)}
                  className="px-4 py-2 bg-slate-700 rounded-lg text-white"
                >
                  Hủy
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Danh sách API Keys</h3>
        {apiKeys.map((apiKey) => (
          <div
            key={apiKey.id}
            className="p-5 bg-slate-800/30 rounded-xl border border-slate-700"
          >
            <div className="flex justify-between flex-wrap gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-white font-semibold">{apiKey.name}</h4>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${apiKey.status === "active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
                  >
                    {apiKey.status === "active" ? "Hoạt động" : "Vô hiệu"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="text-xs font-mono text-slate-400">
                    {showFullKey[apiKey.id] ? apiKey.key : apiKey.keyPreview}
                  </code>
                  <button
                    onClick={() =>
                      setShowFullKey({
                        ...showFullKey,
                        [apiKey.id]: !showFullKey[apiKey.id],
                      })
                    }
                    className="p-1 hover:bg-slate-700 rounded"
                  >
                    {showFullKey[apiKey.id] ? (
                      <EyeOff className="w-3.5 h-3.5" />
                    ) : (
                      <Eye className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    onClick={() => copyToClipboard(apiKey.key, apiKey.name)}
                    className="p-1 hover:bg-slate-700 rounded"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleKeyStatus(apiKey.id)}
                  className={`p-2 rounded-lg ${apiKey.status === "active" ? "bg-yellow-500/20" : "bg-green-500/20"}`}
                >
                  {apiKey.status === "active" ? (
                    <XCircle className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  )}
                </button>
                <button
                  onClick={() => deleteKey(apiKey.id, apiKey.name)}
                  className="p-2 bg-red-500/20 rounded-lg"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-xs mt-3 pt-3 border-t border-slate-700">
              <span className="text-slate-500">Tạo: {apiKey.createdAt}</span>
              {apiKey.lastUsed && (
                <span className="text-slate-500">
                  Lần cuối: {new Date(apiKey.lastUsed).toLocaleString("vi-VN")}
                </span>
              )}
              <span className="text-slate-500">
                Quyền: {apiKey.permissions.join(", ")}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/30">
        <h3 className="text-lg font-semibold text-white mb-3">
          📘 Hướng dẫn sử dụng API
        </h3>
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-slate-300 mb-2">1. Thêm API Key vào Header:</p>
            <pre className="p-3 bg-slate-900 rounded-lg text-green-400 text-xs">
              Authorization: Bearer YOUR_API_KEY{"\n"}Content-Type:
              application/json
            </pre>
          </div>
          <div>
            <p className="text-slate-300 mb-2">2. Ví dụ gọi API:</p>
            <pre className="p-3 bg-slate-900 rounded-lg text-green-400 text-xs">
              curl -X GET https://api.ormai.com/v1/reviews \{"\n"} -H
              "Authorization: Bearer YOUR_API_KEY"
            </pre>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            📘 Xem chi tiết tại{" "}
            <a href="/dashboard/docs" className="text-blue-400 hover:underline">
              Tài liệu API
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
