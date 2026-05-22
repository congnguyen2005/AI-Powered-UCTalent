// app/dashboard/help/page.tsx - Cập nhật để tích hợp chat widget
'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  Star,
  Phone,
  Send,
  Paperclip,
  Smile,
  X,
  Minimize2,
  Maximize2,
  CheckCheck
} from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

// FAQ Data
const faqs = [
  {
    id: 'getting-started',
    category: 'Bắt đầu',
    icon: BookOpen,
    color: 'blue',
    questions: [
      {
        q: 'Làm thế nào để đăng ký tài khoản?',
        a: 'Bạn có thể đăng ký tài khoản tại trang chủ bằng cách nhấn "Đăng ký miễn phí". Điền thông tin cá nhân và công ty, sau đó xác nhận email. Quá trình chỉ mất 2 phút.',
      },
      {
        q: 'Dùng thử miễn phí bao lâu?',
        a: 'Gói dùng thử miễn phí kéo dài 14 ngày với đầy đủ tính năng của gói Professional. Không cần thẻ tín dụng để đăng ký.',
      },
      {
        q: 'Làm sao để kết nối cửa hàng với hệ thống?',
        a: 'Vào mục Cài đặt > Tích hợp, chọn nền tảng (Google Maps, Facebook, TripAdvisor...) và làm theo hướng dẫn xác thực OAuth. Hệ thống sẽ tự động đồng bộ đánh giá.',
      },
    ],
  },
  {
    id: 'ai-features',
    category: 'Tính năng AI',
    icon: Zap,
    color: 'purple',
    questions: [
      {
        q: 'AI tạo phản hồi như thế nào?',
        a: 'AI phân tích nội dung đánh giá, cảm xúc khách hàng, sau đó đề xuất 3-5 phản hồi phù hợp với giọng nói thương hiệu của bạn. Bạn có thể chọn, chỉnh sửa hoặc duyệt để đăng tự động.',
      },
      {
        q: 'Độ chính xác của AI là bao nhiêu?',
        a: 'Hệ thống đạt độ chính xác lên đến 94% trong phân tích cảm xúc và 87% tỷ lệ duyệt phản hồi. AI liên tục được cải thiện dựa trên phản hồi của bạn.',
      },
      {
        q: 'Tôi có thể huấn luyện AI theo ngành của mình không?',
        a: 'Có! Bạn có thể tùy chỉnh prompt, từ khóa thương hiệu, và phản hồi mẫu. AI sẽ học và điều chỉnh theo phong cách riêng của doanh nghiệp bạn.',
      },
    ],
  },
  {
    id: 'crisis',
    category: 'Quản lý khủng hoảng',
    icon: Shield,
    color: 'red',
    questions: [
      {
        q: 'Làm sao để phát hiện khủng hoảng truyền thông?',
        a: 'Hệ thống tự động quét các từ khóa nguy cơ, đánh giá tiêu cực mạnh, và gửi cảnh báo realtime đến trung tâm khủng hoảng. Bạn sẽ nhận được email và thông báo ngay lập tức.',
      },
      {
        q: 'Thời gian xử lý khủng hoảng là bao lâu?',
        a: 'Chúng tôi khuyến nghị phản hồi trong vòng 15 phút đối với cảnh báo nguy cấp. Hệ thống sẽ gợi ý kịch bản xử lý và các bước cần thực hiện.',
      },
    ],
  },
]

// Live Chat Component tích hợp sẵn trong trang help
function LiveChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    { id: '1', text: 'Xin chào! Tôi là trợ lý hỗ trợ của ORM AI. Tôi có thể giúp gì cho bạn? 😊', sender: 'agent', time: new Date() }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!inputText.trim()) return
    setMessages(prev => [...prev, { id: Date.now().toString(), text: inputText.trim(), sender: 'user', time: new Date() }])
    setInputText('')
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        text: 'Cảm ơn bạn đã liên hệ! Nhân viên hỗ trợ sẽ phản hồi bạn trong giây lát. Vui lòng để lại email để chúng tôi có thể liên hệ nhanh nhất!', 
        sender: 'agent', 
        time: new Date() 
      }])
    }, 1500)
  }

  const quickReplies = ['Tôi muốn đăng ký dùng thử', 'Hướng dẫn tích hợp API', 'Báo cáo lỗi hệ thống', 'Tư vấn gói cước']

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30 flex items-center justify-center hover:scale-105 transition"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={`fixed bottom-24 right-6 z-50 bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden transition-all duration-300 ${
              isMinimized ? 'w-80 h-14' : 'w-[380px] h-[550px]'
            }`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-slate-700 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Headphones className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">Hỗ trợ trực tuyến</h3>
                    <p className="text-xs text-green-400 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      Đang hoạt động
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => setIsMinimized(!isMinimized)} className="p-1.5 hover:bg-white/10 rounded-lg">
                    {isMinimized ? <Maximize2 className="w-4 h-4 text-slate-400" /> : <Minimize2 className="w-4 h-4 text-slate-400" />}
                  </button>
                  <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg">
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>

            {!isMinimized && (
              <>
                <div className="h-[380px] overflow-y-auto p-4 space-y-3 bg-slate-800/30">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-2xl ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-sm'
                          : 'bg-slate-700 text-slate-200 rounded-bl-sm'
                      }`}>
                        <p className="text-sm">{msg.text}</p>
                        <div className="flex justify-end mt-1">
                          <span className="text-[10px] opacity-70">
                            {msg.time.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-slate-700 rounded-2xl rounded-bl-sm p-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="px-4 py-2 border-t border-slate-700 overflow-x-auto">
                  <div className="flex gap-2">
                    {quickReplies.map((reply, idx) => (
                      <button key={idx} onClick={() => setInputText(reply)} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-full text-xs text-slate-300 whitespace-nowrap transition">
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 border-t border-slate-700 bg-slate-800/50">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-slate-700 rounded-lg">
                      <Paperclip className="w-5 h-5 text-slate-400" />
                    </button>
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Nhập tin nhắn..."
                      className="flex-1 px-4 py-2 bg-slate-700 border-0 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                    />
                    <button className="p-2 hover:bg-slate-700 rounded-lg">
                      <Smile className="w-5 h-5 text-slate-400" />
                    </button>
                    <button onClick={handleSend} className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                      <Send className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const allFaqs = faqs.flatMap(cat => cat.questions.map(q => ({ ...q, category: cat.category })))
  
  const filteredFaqs = searchQuery
    ? allFaqs.filter(f => f.q.toLowerCase().includes(searchQuery.toLowerCase()) || f.a.toLowerCase().includes(searchQuery.toLowerCase()))
    : allFaqs

  const supportOptions = [
    { icon: Headphones, title: 'Chat trực tuyến', description: 'Hỗ trợ 24/7, phản hồi trong 1 phút', action: 'Chat ngay', color: 'blue', onClick: () => document.querySelector<HTMLButtonElement>('.fixed.bottom-6.right-6')?.click() },
    { icon: Phone, title: 'Hotline', description: '0982509443 - 8:00 - 21:00', action: 'Gọi ngay', href: 'tel:0982509443', color: 'green' },
    { icon: Mail, title: 'Email', description: 'dangcongnguyenst@gmail.com - Phản hồi trong 2h', action: 'Gửi email', href: 'mailto:dangcongnguyenst@gmail.com', color: 'purple' },
    { icon: FileText, title: 'Tài liệu', description: 'Hướng dẫn chi tiết', action: 'Xem ngay', href: '/dashboard/docs', color: 'orange' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-7 h-7 text-blue-400" />
          Trung tâm trợ giúp
        </h1>
        <p className="text-slate-400 mt-1">Hướng dẫn, giải đáp thắc mắc và hỗ trợ kỹ thuật 24/7</p>
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

      {/* Support Channels */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {supportOptions.map((option, idx) => {
          const Icon = option.icon
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-5 bg-gradient-to-br from-${option.color}-500/10 to-${option.color}-600/5 rounded-xl border border-${option.color}-500/30 text-center cursor-pointer hover:scale-105 transition`}
              onClick={option.onClick || (() => window.location.href = option.href!)}
            >
              <Icon className={`w-10 h-10 text-${option.color}-400 mx-auto mb-3`} />
              <h3 className="text-white font-semibold mb-1">{option.title}</h3>
              <p className="text-xs text-slate-400 mb-3">{option.description}</p>
              <span className="inline-flex items-center gap-1 text-sm text-blue-400">
                {option.action} <ExternalLink className="w-3 h-3" />
              </span>
            </motion.div>
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
                <span className="text-white font-medium pr-4">{faq.q}</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="pb-3 text-slate-400 text-sm pl-0">
                {faq.a}
              </div>
            </motion.details>
          ))}
        </div>
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
        <button 
          onClick={() => document.querySelector<HTMLButtonElement>('.fixed.bottom-6.right-6')?.click()}
          className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white font-medium transition flex items-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          Chat với nhân viên hỗ trợ
        </button>
      </div>

      {/* Contact Info */}
      <div className="text-center text-sm text-slate-500">
        <p>Email: dangcongnguyenst@gmail.com | Hotline: 0982509443 | Giờ làm việc: 8:00 - 21:00 (T2-CN)</p>
        <p className="mt-2 text-xs">💡 Bạn cũng có thể gửi yêu cầu hỗ trợ qua email, chúng tôi sẽ phản hồi trong vòng 2 giờ làm việc</p>
      </div>

      {/* Live Chat Button */}
      <LiveChatButton />
    </div>
  )
}