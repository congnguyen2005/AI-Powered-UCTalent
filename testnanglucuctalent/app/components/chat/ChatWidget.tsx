// app/components/chat/ChatWidget.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, X, Send, Minimize2, Maximize2, 
  User, Headphones, Clock, CheckCheck, Phone, Mail,
  Paperclip, Smile, Mic, MoreVertical, Volume2, Info
} from 'lucide-react'
import toast from 'react-hot-toast'

interface Message {
  id: string
  text: string
  sender: 'user' | 'agent'
  timestamp: Date
  status?: 'sending' | 'sent' | 'delivered' | 'read'
  attachment?: {
    type: 'image' | 'file'
    url: string
    name: string
  }
}

interface ChatWidgetProps {
  agentName?: string
  agentAvatar?: string
  businessHours?: { start: number; end: number }
}

export default function ChatWidget({ 
  agentName = "Hỗ trợ viên",
  agentAvatar = "",
  businessHours = { start: 8, end: 21 }
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Xin chào! Tôi là trợ lý hỗ trợ của ORM AI. Tôi có thể giúp gì cho bạn hôm nay? 😊',
      sender: 'agent',
      timestamp: new Date(),
      status: 'read'
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isAgentOnline, setIsAgentOnline] = useState(true)
  const [unreadCount, setUnreadCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Kiểm tra giờ làm việc
  useEffect(() => {
    const now = new Date()
    const hour = now.getHours()
    const isOnline = hour >= businessHours.start && hour <= businessHours.end
    setIsAgentOnline(isOnline)
  }, [businessHours])

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input khi mở chat
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen, isMinimized])

  // Simulate agent typing
  const simulateAgentTyping = () => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const autoReply = generateAutoReply(inputText)
      if (autoReply) {
        addMessage(autoReply, 'agent')
      }
    }, 1500 + Math.random() * 1000)
  }

  const generateAutoReply = (userMessage: string): string => {
    const lowerMsg = userMessage.toLowerCase()
    
    if (lowerMsg.includes('cảm ơn') || lowerMsg.includes('thanks')) {
      return 'Rất vui được giúp đỡ bạn! Nếu cần thêm hỗ trợ, hãy chat lại nhé. Chúc bạn một ngày tốt lành! 🌟'
    }
    if (lowerMsg.includes('giá') || lowerMsg.includes('chi phí') || lowerMsg.includes('bao nhiêu')) {
      return 'ORM AI có các gói dịch vụ: Starter ($49/tháng), Professional ($149/tháng) và Enterprise (liên hệ). Bạn có thể xem chi tiết tại trang Giá cả. Bạn muốn tôi tư vấn gói nào phù hợp không?'
    }
    if (lowerMsg.includes('tích hợp') || lowerMsg.includes('api') || lowerMsg.includes('kết nối')) {
      return 'ORM AI hỗ trợ tích hợp với nhiều nền tảng: Google Maps, Facebook, TripAdvisor, và nhiều nền tảng khác. Bạn có thể dễ dàng kết nối qua mục Cài đặt > Tích hợp. Bạn cần hỗ trợ kết nối nền tảng nào?'
    }
    if (lowerMsg.includes('lỗi') || lowerMsg.includes('không hoạt động') || lowerMsg.includes('bug')) {
      return 'Rất tiếc về sự cố! Vui lòng mô tả chi tiết vấn đề bạn gặp phải. Đội ngũ kỹ thuật sẽ xử lý ngay. Bạn có thể cung cấp thêm thông tin được không?'
    }
    if (lowerMsg.includes('tài khoản') || lowerMsg.includes('đăng nhập') || lowerMsg.includes('quên mật khẩu')) {
      return 'Để đặt lại mật khẩu, bạn vào trang đăng nhập và nhấn "Quên mật khẩu". Hệ thống sẽ gửi email hướng dẫn. Bạn cần tôi gửi link đặt lại mật khẩu không?'
    }
    if (lowerMsg.includes('cảnh báo') || lowerMsg.includes('khủng hoảng') || lowerMsg.includes('crisis')) {
      return 'Hệ thống phát hiện khủng hoảng hoạt động 24/7. Khi phát hiện review có rủi ro cao, hệ thống sẽ tự động gửi cảnh báo qua email và thông báo realtime. Bạn có muốn cấu hình thêm kênh nhận cảnh báo không?'
    }
    if (lowerMsg.includes('demo') || lowerMsg.includes('dùng thử')) {
      return 'Bạn có thể đăng ký dùng thử miễn phí 14 ngày tại đây! Đăng ký ngay để trải nghiệm đầy đủ tính năng. Bạn cần tôi hướng dẫn đăng ký không?'
    }
    
    // Default responses
    const responses = [
      'Cảm ơn bạn đã liên hệ! Tôi đang xử lý yêu cầu của bạn, vui lòng chờ trong giây lát...',
      'Tôi hiểu vấn đề của bạn. Để giải quyết tốt nhất, bạn vui lòng cung cấp thêm thông tin chi tiết nhé!',
      'Chúng tôi rất coi trọng ý kiến của bạn! Đội ngũ hỗ trợ sẽ phản hồi trong thời gian sớm nhất.',
      'Bạn có thể tham khảo thêm tài liệu hướng dẫn tại mục "Tài liệu" trên dashboard. Nếu cần thêm hỗ trợ, hãy cho tôi biết nhé!'
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const addMessage = (text: string, sender: 'user' | 'agent') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      status: 'sent'
    }
    setMessages(prev => [...prev, newMessage])
    
    if (sender === 'user' && !isMinimized) {
      simulateAgentTyping()
    }
  }

  const handleSendMessage = () => {
    if (!inputText.trim()) return
    
    addMessage(inputText.trim(), 'user')
    setInputText('')
    
    // Play send sound (optional)
    // new Audio('/sounds/send.mp3').play()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  }

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'sent': return <CheckCheck className="w-3 h-3 text-slate-400" />
      case 'delivered': return <CheckCheck className="w-3 h-3 text-blue-400" />
      case 'read': return <CheckCheck className="w-3 h-3 text-green-400" />
      default: return null
    }
  }

  // Quick reply options
  const quickReplies = [
    'Tôi muốn đăng ký dùng thử',
    'Hướng dẫn tích hợp API',
    'Báo cáo lỗi hệ thống',
    'Tư vấn gói cước',
    'Hỗ trợ kỹ thuật',
    'Góp ý tính năng'
  ]

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30 flex items-center justify-center group"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: { type: 'spring', damping: 25 }
            }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={`fixed bottom-24 right-6 z-50 bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden transition-all duration-300 ${
              isMinimized ? 'w-80 h-14' : 'w-[400px] h-[600px]'
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
                    {isAgentOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">
                      Hỗ trợ trực tuyến
                    </h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      {isAgentOnline ? (
                        <>
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                          {agentName} đang hoạt động
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3" />
                          {businessHours.start}:00 - {businessHours.end}:00
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition"
                  >
                    {isMinimized ? <Maximize2 className="w-4 h-4 text-slate-400" /> : <Minimize2 className="w-4 h-4 text-slate-400" />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition"
                  >
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Area */}
                <div className="flex-1 h-[460px] overflow-y-auto p-4 space-y-3 bg-slate-800/30">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, x: message.sender === 'user' ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                        <div className={`relative p-3 rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-sm'
                            : 'bg-slate-700 text-slate-200 rounded-bl-sm'
                        }`}>
                          <p className="text-sm break-words">{message.text}</p>
                          {message.attachment && (
                            <div className="mt-2 p-2 bg-black/20 rounded-lg">
                              {message.attachment.type === 'image' ? (
                                <img src={message.attachment.url} alt="attachment" className="max-w-full rounded" />
                              ) : (
                                <div className="flex items-center gap-2">
                                  <Paperclip className="w-4 h-4" />
                                  <span className="text-xs">{message.attachment.name}</span>
                                </div>
                              )}
                            </div>
                          )}
                          <div className={`flex items-center gap-1 mt-1 ${
                            message.sender === 'user' ? 'justify-end' : 'justify-start'
                          }`}>
                            <span className="text-[10px] opacity-70">
                              {formatTime(message.timestamp)}
                            </span>
                            {message.sender === 'user' && getStatusIcon(message.status)}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-slate-700 rounded-2xl rounded-bl-sm p-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                <div className="px-4 py-2 border-t border-slate-700 overflow-x-auto scrollbar-hide">
                  <div className="flex gap-2">
                    {quickReplies.map((reply, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setInputText(reply)
                          handleSendMessage()
                        }}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-full text-xs text-slate-300 whitespace-nowrap transition"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-slate-700 bg-slate-800/50">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-slate-700 rounded-lg transition">
                      <Paperclip className="w-5 h-5 text-slate-400" />
                    </button>
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Nhập tin nhắn..."
                      className="flex-1 px-4 py-2 bg-slate-700 border-0 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                    />
                    <button
                      onClick={() => {/* Open emoji picker */}}
                      className="p-2 hover:bg-slate-700 rounded-lg transition"
                    >
                      <Smile className="w-5 h-5 text-slate-400" />
                    </button>
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputText.trim()}
                      className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition disabled:opacity-50"
                    >
                      <Send className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>

                {/* Contact Options */}
                <div className="px-4 py-2 border-t border-slate-700 bg-slate-800/30 flex justify-center gap-4">
                  <a href="tel:19001234" className="flex items-center gap-1 text-xs text-slate-400 hover:text-blue-400 transition">
                    <Phone className="w-3 h-3" />
                    Gọi hotline
                  </a>
                  <a href="mailto:support@ormai.com" className="flex items-center gap-1 text-xs text-slate-400 hover:text-blue-400 transition">
                    <Mail className="w-3 h-3" />
                    Gửi email
                  </a>
                  <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-blue-400 transition">
                    <Info className="w-3 h-3" />
                    FAQ
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}