'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FileText,
  Search,
  BookOpen,
  Code,
  Database,
  Shield,
  Zap,
  Users,
  Settings,
  ChevronRight,
  Download,
  Copy,
  CheckCircle,
  ExternalLink,
  Globe,
  Mail,
  Sparkles,
  Brain,
  BarChart3,
  AlertTriangle,
  MessageSquare,
  Star,
  Clock,
  Link2, // Thay thế cho Github
  MessageCircle
} from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const docs = [
    {
      id: 'getting-started',
      title: 'Bắt đầu với ORM AI',
      description: 'Hướng dẫn cài đặt và cấu hình ban đầu',
      icon: BookOpen,
      category: 'getting-started',
      content: 'Cài đặt tài khoản, kết nối nền tảng, cấu hình cơ bản...',
      readTime: '5 phút'
    },
    {
      id: 'api-integration',
      title: 'API Integration',
      description: 'Tích hợp API cho developer',
      icon: Code,
      category: 'api',
      content: 'Hướng dẫn sử dụng REST API, authentication, endpoints...',
      readTime: '10 phút'
    },
    {
      id: 'ai-responses',
      title: 'AI Response Generation',
      description: 'Tối ưu phản hồi tự động bằng AI',
      icon: Brain,
      category: 'ai',
      content: 'Cấu hình prompt, training model, tùy chỉnh giọng nói...',
      readTime: '8 phút'
    },
    {
      id: 'sentiment-analysis',
      title: 'Sentiment Analysis',
      description: 'Phân tích cảm xúc khách hàng',
      icon: BarChart3,
      category: 'ai',
      content: 'Hiểu về thuật toán, đánh giá độ chính xác, xử lý dữ liệu...',
      readTime: '6 phút'
    },
    {
      id: 'crisis-management',
      title: 'Crisis Management',
      description: 'Phát hiện và xử lý khủng hoảng',
      icon: AlertTriangle,
      category: 'crisis',
      content: 'Thiết lập cảnh báo, quy trình xử lý, kịch bản ứng phó...',
      readTime: '12 phút'
    },
    {
      id: 'data-security',
      title: 'Data Security & Privacy',
      description: 'Bảo mật dữ liệu và GDPR compliance',
      icon: Shield,
      category: 'security',
      content: 'Mã hóa dữ liệu, backup, tuân thủ quy định...',
      readTime: '7 phút'
    },
    {
      id: 'review-management',
      title: 'Quản lý đánh giá',
      description: 'Hướng dẫn sử dụng Review Feed',
      icon: MessageSquare,
      category: 'features',
      content: 'Lọc review, gán nhãn, phản hồi hàng loạt...',
      readTime: '4 phút'
    },
    {
      id: 'analytics-dashboard',
      title: 'Analytics Dashboard',
      description: 'Đọc và phân tích báo cáo',
      icon: BarChart3,
      category: 'features',
      content: 'KPI metrics, biểu đồ sentiment, export báo cáo...',
      readTime: '6 phút'
    },
    {
      id: 'brand-voice',
      title: 'Brand Voice Configuration',
      description: 'Cấu hình giọng nói thương hiệu',
      icon: Sparkles,
      category: 'settings',
      content: 'Tone giọng, từ khóa, template phản hồi...',
      readTime: '5 phút'
    },
    {
      id: 'rbac',
      title: 'Phân quyền người dùng (RBAC)',
      description: 'Quản lý vai trò và quyền truy cập',
      icon: Users,
      category: 'organization',
      content: 'Tạo role, gán permission, audit logs...',
      readTime: '8 phút'
    }
  ]

  const categories = [
    { id: 'all', name: 'Tất cả', icon: FileText },
    { id: 'getting-started', name: 'Bắt đầu', icon: BookOpen },
    { id: 'features', name: 'Tính năng', icon: Star },
    { id: 'ai', name: 'AI & Machine Learning', icon: Brain },
    { id: 'api', name: 'API & Integration', icon: Code },
    { id: 'crisis', name: 'Crisis Management', icon: AlertTriangle },
    { id: 'security', name: 'Bảo mật', icon: Shield },
    { id: 'organization', name: 'Tổ chức', icon: Users },
    { id: 'settings', name: 'Cài đặt', icon: Settings }
  ]

  const filteredDocs = docs.filter(doc => {
    const matchesSearch = searchQuery === '' || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'all' || doc.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const copyCode = () => {
    navigator.clipboard.writeText(`curl -X POST https://api.ormai.com/v1/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"review_text": "Dịch vụ tuyệt vời!", "sentiment": "positive"}'`)
    toast.success('Đã sao chép mã mẫu')
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <FileText className="w-7 h-7 text-purple-400" />
          Tài liệu hướng dẫn
        </h1>
        <p className="text-slate-400 mt-1">Tài liệu chi tiết về ORM AI Platform</p>
      </div>

      {/* Search and Quick Links */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Tìm kiếm tài liệu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white text-sm flex items-center gap-2 hover:bg-slate-800 transition">
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          <Link href="https://github.com" target="_blank" className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white text-sm flex items-center gap-2 hover:bg-slate-800 transition">
            <Link2 className="w-4 h-4" />
            GitHub
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                  : 'bg-slate-800/30 text-slate-400 hover:bg-slate-800/50 border border-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {cat.name}
            </button>
          )
        })}
      </div>

      {/* API Code Example */}
      <div className="p-6 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-xl border border-purple-500/30">
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <Code className="w-5 h-5 text-purple-400" />
          Quick Start - API Example
        </h3>
        <div className="relative">
          <pre className="p-4 bg-slate-900 rounded-lg overflow-x-auto">
            <code className="text-sm text-green-400">
{`curl -X POST https://api.ormai.com/v1/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "review_text": "Dịch vụ tuyệt vời! Nhân viên thân thiện.",
    "sentiment": "positive",
    "tone": "friendly"
  }'`}
            </code>
          </pre>
          <button
            onClick={copyCode}
            className="absolute top-2 right-2 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition"
          >
            <Copy className="w-4 h-4 text-slate-400" />
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-3">
          🔑 Bạn cần API key để sử dụng. Lấy API key tại{' '}
          <Link href="/dashboard/settings/api-keys" className="text-purple-400 hover:underline">
            Cài đặt → API Keys
          </Link>
        </p>
      </div>

      {/* Docs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc, idx) => {
          const Icon = doc.icon
          return (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group p-5 bg-slate-800/30 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-all cursor-pointer hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="w-3 h-3" />
                  <span>{doc.readTime}</span>
                </div>
              </div>
              <h3 className="text-white font-semibold mb-1 group-hover:text-purple-400 transition">
                {doc.title}
              </h3>
              <p className="text-sm text-slate-400 mb-3">{doc.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">{doc.content}</span>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition" />
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* No Results */}
      {filteredDocs.length === 0 && (
        <div className="text-center py-12 bg-slate-800/30 rounded-xl border border-slate-700">
          <FileText className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <p className="text-slate-400">Không tìm thấy tài liệu phù hợp</p>
          <p className="text-sm text-slate-500 mt-1">Thử tìm kiếm với từ khóa khác</p>
        </div>
      )}

      {/* Support Section */}
      <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <p className="text-white font-medium">Không tìm thấy câu trả lời?</p>
            <p className="text-sm text-slate-400">Liên hệ đội ngũ hỗ trợ để được giúp đỡ</p>
          </div>
        </div>
        <Link
          href="/dashboard/help"
          className="px-5 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition flex items-center gap-2"
        >
          <Mail className="w-4 h-4" />
          Hỗ trợ trực tiếp
        </Link>
      </div>

      {/* Version Info */}
      <div className="text-center text-xs text-slate-500">
        <p>Documentation Version: v2.0.0 | Last updated: January 2026 | API Version: v1</p>
        <p className="mt-1">
          <Link href="#" className="hover:text-purple-400">Changelog</Link> • 
          <Link href="#" className="hover:text-purple-400 ml-2">API Reference</Link> • 
          <Link href="#" className="hover:text-purple-400 ml-2">SDKs</Link>
        </p>
      </div>
    </div>
  )
}