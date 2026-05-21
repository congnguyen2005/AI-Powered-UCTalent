'use client'

import { useState, useEffect } from 'react'
import { Key, Plus, Copy, Trash2, Eye, EyeOff, RefreshCw, CheckCircle, XCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

interface APIKey {
  id: string
  name: string
  key: string
  keyPreview: string
  createdAt: string
  lastUsed: string | null
  status: 'active' | 'inactive'
  permissions: string[]
}

export default function APIKeysPage() {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      id: '1',
      name: 'Production API Key',
      key: 'sk_live_8x7f3k9m2n5p1q4r6s8t0u2v4w6x8y0z',
      keyPreview: 'sk_live_8x7f3k9m2n...',
      createdAt: '2024-01-15',
      lastUsed: '2026-01-20T10:30:00Z',
      status: 'active',
      permissions: ['read', 'write', 'delete']
    },
    {
      id: '2',
      name: 'Testing API Key',
      key: 'sk_test_9y8g7h6j5k4l3m2n1p0q9r8s7t6u5v4w',
      keyPreview: 'sk_test_9y8g7h6j5k...',
      createdAt: '2024-02-10',
      lastUsed: '2026-01-19T15:45:00Z',
      status: 'active',
      permissions: ['read', 'write']
    },
    {
      id: '3',
      name: 'Analytics Integration',
      key: 'sk_analytics_3x2c1v4b5n6m7k8l9j0h1g2f3d4s5a6',
      keyPreview: 'sk_analytics_3x2c1v4b5n...',
      createdAt: '2024-03-05',
      lastUsed: '2026-01-18T09:20:00Z',
      status: 'inactive',
      permissions: ['read']
    }
  ])

  const [showNewKeyForm, setShowNewKeyForm] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [newKeyPermissions, setNewKeyPermissions] = useState(['read'])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedKey, setGeneratedKey] = useState<string | null>(null)
  const [showFullKey, setShowFullKey] = useState<Record<string, boolean>>({})

  const generateApiKey = () => {
    const prefix = 'sk_live_'
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let result = prefix
    for (let i = 0; i < 40; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const handleCreateKey = () => {
    if (!newKeyName.trim()) {
      toast.error('Vui lòng nhập tên cho API Key')
      return
    }

    setIsGenerating(true)
    
    setTimeout(() => {
      const newKey = generateApiKey()
      const newApiKey: APIKey = {
        id: Date.now().toString(),
        name: newKeyName,
        key: newKey,
        keyPreview: newKey.slice(0, 20) + '...',
        createdAt: new Date().toISOString().split('T')[0],
        lastUsed: null,
        status: 'active',
        permissions: newKeyPermissions
      }
      
      setGeneratedKey(newKey)
      setApiKeys([newApiKey, ...apiKeys])
      setNewKeyName('')
      setNewKeyPermissions(['read'])
      setIsGenerating(false)
      
      toast.success('API Key đã được tạo!', {
        duration: 5000,
      })
    }, 1000)
  }

  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`Đã sao chép ${name}`)
  }

  const toggleKeyStatus = (id: string) => {
    setApiKeys(prev => prev.map(key => 
      key.id === id 
        ? { ...key, status: key.status === 'active' ? 'inactive' : 'active' }
        : key
    ))
    toast.success('Đã cập nhật trạng thái API Key')
  }

  const deleteKey = (id: string, name: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa API Key "${name}"?`)) {
      setApiKeys(prev => prev.filter(key => key.id !== id))
      toast.success('Đã xóa API Key')
    }
  }

  const toggleShowKey = (id: string) => {
    setShowFullKey(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const permissionLabels: Record<string, string> = {
    read: 'Đọc dữ liệu',
    write: 'Ghi dữ liệu',
    delete: 'Xóa dữ liệu'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Key className="w-7 h-7 text-purple-400" />
            API Keys
          </h1>
          <p className="text-slate-400 mt-1">Quản lý khóa API cho tích hợp hệ thống</p>
        </div>
        <button
          onClick={() => setShowNewKeyForm(!showNewKeyForm)}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white text-sm font-medium flex items-center gap-2 transition"
        >
          <Plus className="w-4 h-4" />
          Tạo API Key
        </button>
      </div>

      {/* Create New Key Form */}
      {showNewKeyForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-xl border border-purple-500/30"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Tạo API Key mới</h3>
          
          {generatedKey ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                <p className="text-green-400 text-sm mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  API Key đã được tạo thành công!
                </p>
                <p className="text-xs text-slate-400 mb-2">Lưu key này ngay bây giờ, bạn sẽ không thể xem lại sau:</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 p-3 bg-slate-900 rounded-lg text-green-400 text-sm font-mono break-all">
                    {generatedKey}
                  </code>
                  <button
                    onClick={() => copyToClipboard(generatedKey, 'API Key')}
                    className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition"
                  >
                    <Copy className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>
              <button
                onClick={() => {
                  setGeneratedKey(null)
                  setShowNewKeyForm(false)
                }}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white text-sm transition"
              >
                Đóng
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Tên API Key</label>
                  <input
                    type="text"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="VD: Production API, Mobile App Key..."
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Quyền truy cập</label>
                  <div className="flex flex-wrap gap-3">
                    {['read', 'write', 'delete'].map(perm => (
                      <label key={perm} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newKeyPermissions.includes(perm as any)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewKeyPermissions([...newKeyPermissions, perm as any])
                            } else {
                              setNewKeyPermissions(newKeyPermissions.filter(p => p !== perm))
                            }
                          }}
                          className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-slate-300">{permissionLabels[perm]}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleCreateKey}
                    disabled={isGenerating}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm font-medium flex items-center gap-2 transition disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Đang tạo...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Tạo Key
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setShowNewKeyForm(false)
                      setNewKeyName('')
                      setGeneratedKey(null)
                    }}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white text-sm transition"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      )}

      {/* API Keys List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Danh sách API Keys</h3>
        
        {apiKeys.length === 0 ? (
          <div className="text-center py-12 bg-slate-800/30 rounded-xl border border-slate-700">
            <Key className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <p className="text-slate-400">Chưa có API Key nào</p>
            <p className="text-sm text-slate-500 mt-1">Nhấn "Tạo API Key" để bắt đầu</p>
          </div>
        ) : (
          apiKeys.map((apiKey) => (
            <motion.div
              key={apiKey.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-slate-800/30 rounded-xl border border-slate-700 hover:border-purple-500/30 transition"
            >
              <div className="flex justify-between items-start mb-3 flex-wrap gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-white font-semibold">{apiKey.name}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      apiKey.status === 'active' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {apiKey.status === 'active' ? 'Hoạt động' : 'Vô hiệu hóa'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-xs font-mono text-slate-400">
                      {showFullKey[apiKey.id] ? apiKey.key : apiKey.keyPreview}
                    </code>
                    <button
                      onClick={() => toggleShowKey(apiKey.id)}
                      className="p-1 hover:bg-slate-700 rounded transition"
                    >
                      {showFullKey[apiKey.id] ? (
                        <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                      ) : (
                        <Eye className="w-3.5 h-3.5 text-slate-400" />
                      )}
                    </button>
                    <button
                      onClick={() => copyToClipboard(apiKey.key, apiKey.name)}
                      className="p-1 hover:bg-slate-700 rounded transition"
                    >
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleKeyStatus(apiKey.id)}
                    className={`p-2 rounded-lg transition ${
                      apiKey.status === 'active'
                        ? 'bg-yellow-500/20 hover:bg-yellow-500/30'
                        : 'bg-green-500/20 hover:bg-green-500/30'
                    }`}
                  >
                    {apiKey.status === 'active' ? (
                      <XCircle className="w-4 h-4 text-yellow-400" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    )}
                  </button>
                  <button
                    onClick={() => deleteKey(apiKey.id, apiKey.name)}
                    className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 text-xs">
                <div>
                  <span className="text-slate-500">Tạo lúc:</span>
                  <span className="text-slate-400 ml-1">{apiKey.createdAt}</span>
                </div>
                {apiKey.lastUsed && (
                  <div>
                    <span className="text-slate-500">Lần cuối dùng:</span>
                    <span className="text-slate-400 ml-1">
                      {new Date(apiKey.lastUsed).toLocaleString('vi-VN')}
                    </span>
                  </div>
                )}
                <div>
                  <span className="text-slate-500">Quyền:</span>
                  <div className="flex gap-1 ml-1 inline-flex">
                    {apiKey.permissions.map(perm => (
                      <span key={perm} className="text-xs px-1.5 py-0.5 bg-slate-700 rounded text-slate-300">
                        {permissionLabels[perm]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Usage Guide */}
      <div className="p-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/30">
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <Key className="w-5 h-5 text-blue-400" />
          Hướng dẫn sử dụng API
        </h3>
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-slate-300 mb-2">1. Thêm API Key vào Header:</p>
            <pre className="p-3 bg-slate-900 rounded-lg text-green-400 text-xs overflow-x-auto">
{`Authorization: Bearer YOUR_API_KEY
Content-Type: application/json`}
            </pre>
          </div>
          <div>
            <p className="text-slate-300 mb-2">2. Ví dụ gọi API:</p>
            <pre className="p-3 bg-slate-900 rounded-lg text-green-400 text-xs overflow-x-auto">
{`curl -X GET https://api.ormai.com/v1/reviews \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
            </pre>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-slate-400">API Endpoint: https://api.ormai.com/v1</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            📘 Xem tài liệu chi tiết tại{' '}
            <a href="/dashboard/docs" className="text-blue-400 hover:underline">Tài liệu API</a>
          </p>
        </div>
      </div>
    </div>
  )
}