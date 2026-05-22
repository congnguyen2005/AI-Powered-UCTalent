// app/dashboard/docs/page.tsx - Bản sửa lỗi
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  Link2,
  MessageCircle,
  Terminal,
  Server,
  Cloud,
  Key,
  Lock,
  Rocket,
  GraduationCap,
  Video,
  FileCode,
  BookMarked,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Menu,
  X,
  HelpCircle
} from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

// Documentation structure with escaped content
const docsCategories = [
  {
    id: 'getting-started',
    name: 'Bắt đầu',
    icon: Rocket,
    color: 'blue',
    description: 'Hướng dẫn cài đặt và cấu hình ban đầu',
    articles: [
      {
        id: 'intro',
        title: 'Giới thiệu về ORM AI',
        description: 'Tổng quan về nền tảng quản trị danh tiếng bằng AI',
        readTime: '5 phút',
        level: 'Beginner',
        content: `# Giới thiệu về ORM AI

ORM AI là nền tảng quản trị danh tiếng thông minh sử dụng trí tuệ nhân tạo để tự động:
- Phân tích cảm xúc khách hàng
- Tạo phản hồi thông minh
- Phát hiện khủng hoảng truyền thông
- Báo cáo và phân tích chi tiết

## Tính năng chính

- 🤖 **AI Response Generation**: Tự động tạo phản hồi cho đánh giá khách hàng
- 📊 **Sentiment Analysis**: Phân tích cảm xúc theo thời gian thực
- 🚨 **Crisis Detection**: Phát hiện sớm rủi ro khủng hoảng
- 📈 **Advanced Analytics**: Báo cáo chi tiết về hiệu suất
- 🏢 **Multi-branch**: Quản lý nhiều chi nhánh
- 🔐 **RBAC**: Phân quyền người dùng chi tiết`
      },
      {
        id: 'installation',
        title: 'Cài đặt và cấu hình',
        description: 'Hướng dẫn cài đặt dự án và cấu hình môi trường',
        readTime: '10 phút',
        level: 'Intermediate',
        content: `# Cài đặt dự án

## Yêu cầu hệ thống
- Node.js >= 20.x
- npm hoặc yarn
- Supabase account
- OpenAI API key (tùy chọn)

## Các bước cài đặt

### 1. Clone dự án
` + '```bash' + `
git clone https://github.com/congnguyen2005/AI-Powered-UCTalent.git
cd AI-Powered-UCTalent/testnanglucuctalent
` + '```' + `

### 2. Cài đặt dependencies
` + '```bash' + `
npm install
# hoặc
yarn install
` + '```' + `

### 3. Cấu hình biến môi trường

Tạo file .env.local với nội dung:

` + '```env' + `
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# JWT
JWT_SECRET=your_jwt_secret_min_32_chars
` + '```' + `

### 4. Chạy dự án
` + '```bash' + `
npm run dev
` + '```' + `

Truy cập: http://localhost:3000`
      }
    ]
  },
  {
    id: 'api',
    name: 'API Integration',
    icon: Code,
    color: 'purple',
    description: 'Tích hợp API cho developer',
    articles: [
      {
        id: 'authentication',
        title: 'Xác thực API',
        description: 'Hướng dẫn xác thực khi gọi API',
        readTime: '6 phút',
        level: 'Intermediate',
        content: `# Xác thực API

## Lấy API Key

1. Đăng nhập vào dashboard
2. Vào mục **Cài đặt > API Keys**
3. Nhấn "Tạo API Key"
4. Sao chép và lưu API Key

## Sử dụng API Key

Thêm API Key vào header của request:

` + '```bash' + `
curl -X GET https://api.ormai.com/v1/reviews \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"
` + '```' + `

## Response format

` + '```json' + `
{
  "success": true,
  "data": {
    "reviews": [...]
  }
}
` + '```' + ``
      },
      {
        id: 'endpoints',
        title: 'API Endpoints',
        description: 'Danh sách các endpoint có sẵn',
        readTime: '8 phút',
        level: 'Advanced',
        content: `# API Endpoints

## Reviews

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | /api/reviews | Lấy danh sách đánh giá |
| POST | /api/reviews/approve | Duyệt phản hồi |

## AI

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | /api/ai/generate-response | Tạo phản hồi AI |

## Auth

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | /api/auth/login | Đăng nhập |
| POST | /api/auth/register | Đăng ký |
| POST | /api/auth/logout | Đăng xuất`
      }
    ]
  },
  {
    id: 'ai-features',
    name: 'Tính năng AI',
    icon: Brain,
    color: 'green',
    description: 'Hướng dẫn sử dụng các tính năng AI',
    articles: [
      {
        id: 'sentiment-analysis',
        title: 'Phân tích cảm xúc',
        description: 'Cách sử dụng Sentiment Analysis',
        readTime: '5 phút',
        level: 'Beginner',
        content: `# Phân tích cảm xúc

## Giới thiệu

Hệ thống tự động phân tích cảm xúc của khách hàng dựa trên nội dung đánh giá.

## Các mức độ cảm xúc

- 😊 **Tích cực**: Khách hàng hài lòng
- 😐 **Trung tính**: Khách hàng có cảm xúc trung lập
- 😞 **Tiêu cực**: Khách hàng không hài lòng

## Độ chính xác

Hệ thống đạt độ chính xác lên đến **94%** trong phân tích cảm xúc.`
      },
      {
        id: 'response-generation',
        title: 'Tạo phản hồi AI',
        description: 'Cách sử dụng AI Response Generation',
        readTime: '7 phút',
        level: 'Intermediate',
        content: `# Tạo phản hồi AI

## Cách hoạt động

AI phân tích nội dung đánh giá, cảm xúc khách hàng, sau đó đề xuất 3-5 phản hồi phù hợp.

## Cấu hình giọng nói

Bạn có thể tùy chỉnh:
- **Tone giọng**: Chuyên nghiệp, thân thiện, cao cấp, trẻ trung
- **Mức độ trang trọng**: Trang trọng, bán trang trọng, thân mật
- **Độ dài**: Ngắn, trung bình, chi tiết

## API Example

` + '```javascript' + `
const response = await fetch('/api/ai/generate-response', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    reviewText: 'Dịch vụ tuyệt vời!',
    sentiment: 'positive',
    tone: 'friendly'
  })
})
` + '```' + ``
      }
    ]
  },
  {
    id: 'crisis',
    name: 'Crisis Management',
    icon: AlertTriangle,
    color: 'red',
    description: 'Phát hiện và xử lý khủng hoảng',
    articles: [
      {
        id: 'crisis-detection',
        title: 'Phát hiện khủng hoảng',
        description: 'Cách hệ thống phát hiện rủi ro',
        readTime: '6 phút',
        level: 'Intermediate',
        content: `# Phát hiện khủng hoảng

## Các yếu tố phát hiện

Hệ thống tự động quét các yếu tố:
- Ngôn từ cực đoan, tiêu cực mạnh
- Đề cập đến việc chia sẻ lên mạng xã hội / báo chí
- Đe dọa kiện tụng
- Vấn đề an toàn, sức khỏe
- Nội dung có khả năng lan truyền nhanh (viral)

## Mức độ cảnh báo

| Mức độ | Màu sắc | Hành động |
|--------|---------|-----------|
| Nguy cấp | 🔴 Đỏ | Xử lý ngay trong 15 phút |
| Cao | 🟠 Cam | Theo dõi sát, phản hồi nhanh |
| Trung bình | 🟡 Vàng | Cần phản hồi trong 1 giờ |
| Thấp | 🔵 Xanh | Theo dõi định kỳ |`
      }
    ]
  },
  {
    id: 'security',
    name: 'Bảo mật',
    icon: Shield,
    color: 'yellow',
    description: 'Bảo mật dữ liệu và GDPR compliance',
    articles: [
      {
        id: 'data-security',
        title: 'Bảo mật dữ liệu',
        description: 'Các biện pháp bảo mật của hệ thống',
        readTime: '5 phút',
        level: 'Beginner',
        content: `# Bảo mật dữ liệu

## Các biện pháp bảo mật

- **Mã hóa dữ liệu**: Dữ liệu được mã hóa khi lưu trữ và truyền tải
- **Xác thực JWT**: Sử dụng JSON Web Token cho xác thực
- **Rate Limiting**: Giới hạn số lượng request để tránh tấn công
- **Audit Logs**: Ghi lại tất cả hoạt động quan trọng

## Tuân thủ

Hệ thống tuân thủ các tiêu chuẩn bảo mật:
- GDPR
- ISO 27001`
      }
    ]
  }
]

// Quick links
const quickLinks = [
  { title: 'API Reference', icon: Code, href: '#api', description: 'Tài liệu API chi tiết' },
  { title: 'SDK Downloads', icon: Download, href: '#', description: 'Tải SDK cho các ngôn ngữ' },
  { title: 'Video Tutorials', icon: Video, href: '#', description: 'Video hướng dẫn sử dụng' },
  { title: 'FAQ', icon: HelpCircle, href: '/dashboard/help', description: 'Câu hỏi thường gặp' }
]

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedArticle, setSelectedArticle] = useState<any>(null)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  // Flatten all articles for search
  const allArticles = docsCategories.flatMap(cat => 
    cat.articles.map(article => ({ ...article, category: cat.name, categoryId: cat.id }))
  )

  const filteredArticles = allArticles.filter(article => {
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'all' || article.categoryId === activeCategory
    return matchesSearch && matchesCategory
  })

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    toast.success('Đã sao chép code')
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const getLevelColor = (level: string) => {
    switch(level) {
      case 'Beginner': return 'bg-green-500/20 text-green-400'
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400'
      case 'Advanced': return 'bg-red-500/20 text-red-400'
      default: return 'bg-slate-500/20 text-slate-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <FileText className="w-7 h-7 text-purple-400" />
          Tài liệu hướng dẫn
        </h1>
        <p className="text-slate-400 mt-1">Tài liệu chi tiết về ORM AI Platform - Hướng dẫn cài đặt, API và phát triển</p>
      </div>

      {/* Search Bar */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Tìm kiếm tài liệu, hướng dẫn, API..."
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
          <Link href="https://github.com/congnguyen2005/AI-Powered-UCTalent" target="_blank" className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white text-sm flex items-center gap-2 hover:bg-slate-800 transition">
            <Link2 className="w-4 h-4" />
            GitHub
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
            activeCategory === 'all'
              ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
              : 'bg-slate-800/30 text-slate-400 hover:bg-slate-800/50 border border-slate-700'
          }`}
        >
          <FileText className="w-4 h-4" />
          Tất cả
        </button>
        {docsCategories.map((cat) => {
          const Icon = cat.icon
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                activeCategory === cat.id
                  ? `bg-${cat.color}-600/20 text-${cat.color}-400 border border-${cat.color}-500/30`
                  : 'bg-slate-800/30 text-slate-400 hover:bg-slate-800/50 border border-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {cat.name}
            </button>
          )
        })}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {quickLinks.map((link, idx) => {
          const Icon = link.icon
          return (
            <Link
              key={idx}
              href={link.href}
              className="p-4 bg-gradient-to-br from-white/5 to-white/0 rounded-xl border border-white/10 hover:border-purple-500/30 transition group"
            >
              <Icon className="w-8 h-8 text-purple-400 mb-2" />
              <h3 className="text-white font-semibold group-hover:text-purple-400 transition">{link.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{link.description}</p>
            </Link>
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
            onClick={() => copyCode(`curl -X POST https://api.ormai.com/v1/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "review_text": "Dịch vụ tuyệt vời! Nhân viên thân thiện.",
    "sentiment": "positive",
    "tone": "friendly"
  }'`)}
            className="absolute top-2 right-2 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition"
          >
            {copiedCode === `curl -X POST https://api.ormai.com/v1/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "review_text": "Dịch vụ tuyệt vời! Nhân viên thân thiện.",
    "sentiment": "positive",
    "tone": "friendly"
  }'` ? (
            <CheckCircle className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-slate-400" />
          )}
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
        {filteredArticles.map((article, idx) => {
          const category = docsCategories.find(c => c.id === article.categoryId)
          const Icon = category?.icon || FileText
          const color = category?.color || 'purple'
          return (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedArticle(article)}
              className="group p-5 bg-slate-800/30 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-all cursor-pointer hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-${color}-500/20 flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 text-${color}-400`} />
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getLevelColor(article.level)}`}>
                    {article.level}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
              <h3 className="text-white font-semibold mb-1 group-hover:text-purple-400 transition">
                {article.title}
              </h3>
              <p className="text-sm text-slate-400 mb-3">{article.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">{category?.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition" />
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* No Results */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-12 bg-slate-800/30 rounded-xl border border-slate-700">
          <FileText className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <p className="text-slate-400">Không tìm thấy tài liệu phù hợp</p>
          <p className="text-sm text-slate-500 mt-1">Thử tìm kiếm với từ khóa khác</p>
        </div>
      )}

      {/* Article Detail Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 rounded-2xl border border-slate-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-4 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedArticle.title}</h2>
                  <p className="text-sm text-slate-400">{selectedArticle.description}</p>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              <div className="p-6 prose prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-sm text-slate-300 font-mono">
                  {selectedArticle.content}
                </div>
              </div>
              <div className="border-t border-slate-700 p-4 flex justify-between items-center">
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-lg text-sm text-slate-400 hover:bg-slate-700">
                    <ThumbsUp className="w-4 h-4" /> Hữu ích
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-lg text-sm text-slate-400 hover:bg-slate-700">
                    <ThumbsDown className="w-4 h-4" /> Không hữu ích
                  </button>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm font-medium"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Support Section */}
      <div className="p-6 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-xl border border-purple-500/30 flex items-center justify-between flex-wrap gap-4">
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
          className="px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white font-medium transition flex items-center gap-2"
        >
          <Mail className="w-4 h-4" />
          Hỗ trợ trực tiếp
        </Link>
      </div>

      {/* Version Info */}
      <div className="text-center text-xs text-slate-500">
        <p>Documentation Version: v3.0.0 | Last updated: January 2026 | API Version: v1</p>
        <p className="mt-1 flex items-center justify-center gap-2">
          <Link href="#" className="hover:text-purple-400">Changelog</Link> • 
          <Link href="#" className="hover:text-purple-400">API Reference</Link> • 
          <Link href="#" className="hover:text-purple-400">SDKs</Link> • 
          <Link href="#" className="hover:text-purple-400">Terms of Service</Link>
        </p>
      </div>
    </div>
  )
}