'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  HelpCircle,
  Search,
  Mail,
  MessageCircle,
  BookOpen,
  Video,
  FileText,
  Users,
  ChevronRight,
  Headphones,
  Clock,
  CheckCircle,
  ExternalLink,
  Zap,
  Settings,
  Shield,
  Star
} from 'lucide-react'
import Link from 'next/link'

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const faqs = [
    {
      question: 'Làm thế nào để kết nối cửa hàng với hệ thống?',
      answer: 'Vào mục Cài đặt > Tích hợp, chọn nền tảng (Google Maps, Facebook, etc.) và làm theo hướng dẫn xác thực.',
      category: 'getting-started'
    },
    {
      question: 'AI tạo phản hồi như thế nào?',
      answer: 'AI phân tích nội dung đánh giá, cảm xúc khách hàng, sau đó đề xuất phản hồi phù hợp với giọng nói thương hiệu của bạn.',
      category: 'ai-features'
    },
    {
      question: 'Làm sao để phát hiện khủng hoảng truyền thông?',
      answer: 'Hệ thống tự động quét các từ khóa nguy cơ, đánh giá tiêu cực mạnh và gửi cảnh báo realtime đến trung tâm khủng hoảng.',
      category: 'crisis'
    },
    {
      question: 'Chi phí sử dụng dịch vụ là bao nhiêu?',
      answer: 'Chúng tôi có nhiều gói: Starter ($49/tháng), Professional ($149/tháng) và Enterprise (liên hệ). Dùng thử 14 ngày miễn phí.',
      category: 'billing'
    },
    {
      question: 'Tôi có thể tùy chỉnh giọng nói AI không?',
      answer: 'Có, bạn có thể cấu hình tone giọng, mức độ trang trọng, từ khóa thương hiệu trong mục Cài đặt > Brand Voice.',
      category: 'ai-features'
    },
    {
      question: 'Làm thế nào để phân quyền nhân viên?',
      answer: 'Vào mục Tổ chức > RBAC, bạn có thể gán quyền Admin, Manager, Staff với các chức năng khác nhau.',
      category: 'organization'
    }
  ]

  const categories = [
    { id: 'getting-started', name: 'Bắt đầu', icon: BookOpen, color: 'blue' },
    { id: 'ai-features', name: 'Tính năng AI', icon: Zap, color: 'purple' },
    { id: 'crisis', name: 'Quản lý khủng hoảng', icon: Shield, color: 'red' },
    { id: 'organization', name: 'Tổ chức & Quyền', icon: Users, color: 'green' },
    { id: 'billing', name: 'Thanh toán', icon: Star, color: 'yellow' }
  ]

  const filteredFaqs = searchQuery
    ? faqs.filter(f => f.question.toLowerCase().includes(searchQuery.toLowerCase()) || f.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    : faqs

  const supportOptions = [
    { icon: Headphones, title: 'Hỗ trợ 24/7', description: 'Đội ngũ hỗ trợ luôn sẵn sàng', action: 'Chat ngay', href: '#' },
    { icon: Mail, title: 'Gửi email', description: 'support@ormai.com', action: 'Gửi email', href: 'mailto:support@ormai.com' },
    { icon: MessageCircle, title: 'Community', description: 'Kết nối với cộng đồng', action: 'Tham gia', href: '#' },
    { icon: FileText, title: 'Tài liệu', description: 'Hướng dẫn chi tiết', action: 'Xem ngay', href: '/dashboard/docs' }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-7 h-7 text-blue-400" />
          Trung tâm trợ giúp
        </h1>
        <p className="text-slate-400 mt-1">Hướng dẫn, giải đáp thắc mắc và hỗ trợ kỹ thuật</p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
        <input
          type="text"
          placeholder="Tìm kiếm câu hỏi, hướng dẫn..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-xl bg-gradient-to-br from-${cat.color}-500/10 to-${cat.color}-600/5 border border-${cat.color}-500/30 text-center group cursor-pointer`}
            >
              <Icon className={`w-8 h-8 text-${cat.color}-400 mx-auto mb-2 group-hover:scale-110 transition`} />
              <p className="text-white text-sm font-medium">{cat.name}</p>
            </motion.button>
          )
        })}
      </div>

      {/* FAQ Section */}
      <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-400" />
          Câu hỏi thường gặp
        </h2>
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => (
            <motion.details
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group border-b border-slate-700 last:border-0"
            >
              <summary className="flex justify-between items-center py-3 cursor-pointer list-none">
                <span className="text-white font-medium pr-4">{faq.question}</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="pb-3 text-slate-400 text-sm pl-0">
                {faq.answer}
              </div>
            </motion.details>
          ))}
        </div>
      </div>

      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {supportOptions.map((option, idx) => {
          const Icon = option.icon
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-5 bg-gradient-to-br from-white/5 to-white/0 rounded-xl border border-white/10 text-center"
            >
              <Icon className="w-10 h-10 text-blue-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-1">{option.title}</h3>
              <p className="text-xs text-slate-400 mb-3">{option.description}</p>
              <Link
                href={option.href}
                className="inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition"
              >
                {option.action} <ExternalLink className="w-3 h-3" />
              </Link>
            </motion.div>
          )
        })}
      </div>

      {/* Live Chat CTA */}
      <div className="p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-500/30 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <div>
            <p className="text-white font-medium">Hỗ trợ trực tuyến</p>
            <p className="text-sm text-slate-400">Đội ngũ hỗ trợ sẵn sàng 24/7</p>
          </div>
        </div>
        <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition flex items-center gap-2">
          <MessageCircle className="w-4 h-4" />
          Chat với nhân viên hỗ trợ
        </button>
      </div>

      {/* Contact Info */}
      <div className="text-center text-sm text-slate-500">
        <p>Email:dangcongnguyenst@gmail.com | Hotline: 1900 1234 | Giờ làm việc: 8:00 - 21:00 (T2-CN)</p>
      </div>
    </div>
  )
}