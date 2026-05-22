// app/components/chat/AdminChatPanel.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, Search, Phone, Video, MoreVertical, 
  Send, Paperclip, Smile, CheckCheck, Clock,
  UserCheck, UserX, Volume2, Mic, Ban
} from 'lucide-react'
import toast from 'react-hot-toast'

interface Conversation {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  userEmail: string
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
  status: 'active' | 'waiting' | 'resolved'
  isTyping?: boolean
}

interface Message {
  id: string
  text: string
  sender: 'user' | 'agent'
  timestamp: Date
  status: 'sent' | 'delivered' | 'read'
}

export default function AdminChatPanel() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      userId: 'user_1',
      userName: 'Nguyễn Văn A',
      userEmail: 'nguyenvana@email.com',
      lastMessage: 'Cảm ơn bạn đã hỗ trợ!',
      lastMessageTime: new Date(),
      unreadCount: 2,
      status: 'active',
    },
    {
      id: '2',
      userId: 'user_2',
      userName: 'Trần Thị B',
      userEmail: 'tranthib@email.com',
      lastMessage: 'Tôi cần hỗ trợ về tích hợp API',
      lastMessageTime: new Date(Date.now() - 5 * 60000),
      unreadCount: 0,
      status: 'waiting',
    },
    {
      id: '3',
      userId: 'user_3',
      userName: 'Lê Văn C',
      userEmail: 'levanc@email.com',
      lastMessage: 'Đã giải quyết xong, cảm ơn!',
      lastMessageTime: new Date(Date.now() - 30 * 60000),
      unreadCount: 0,
      status: 'resolved',
    },
  ])
  
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isAgentTyping, setIsAgentTyping] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (selectedConversation) {
      // Load messages for selected conversation
      loadMessages(selectedConversation.id)
    }
  }, [selectedConversation])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const loadMessages = (convId: string) => {
    // Mock messages
    setMessages([
      {
        id: '1',
        text: 'Xin chào! Tôi cần hỗ trợ về cách tích hợp API',
        sender: 'user',
        timestamp: new Date(Date.now() - 10 * 60000),
        status: 'read',
      },
      {
        id: '2',
        text: 'Chào bạn! Tôi có thể giúp gì cho bạn?',
        sender: 'agent',
        timestamp: new Date(Date.now() - 9 * 60000),
        status: 'read',
      },
      {
        id: '3',
        text: 'Bạn có thể hướng dẫn tôi cách lấy API key và sử dụng được không?',
        sender: 'user',
        timestamp: new Date(Date.now() - 8 * 60000),
        status: 'read',
      },
    ])
  }

  const handleSendMessage = () => {
    if (!inputText.trim() || !selectedConversation) return

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'agent',
      timestamp: new Date(),
      status: 'sent',
    }

    setMessages(prev => [...prev, newMessage])
    setInputText('')

    // Update last message in conversation list
    setConversations(prev =>
      prev.map(conv =>
        conv.id === selectedConversation.id
          ? { ...conv, lastMessage: inputText.trim(), lastMessageTime: new Date(), unreadCount: 0 }
          : conv
      )
    )

    toast.success('Đã gửi tin nhắn')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    
    if (minutes < 1) return 'Vừa xong'
    if (minutes < 60) return `${minutes} phút`
    if (minutes < 1440) return `${Math.floor(minutes / 60)} giờ`
    return date.toLocaleDateString('vi-VN')
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full text-xs">Đang trò chuyện</span>
      case 'waiting':
        return <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">Chờ phản hồi</span>
      case 'resolved':
        return <span className="px-2 py-0.5 bg-slate-500/20 text-slate-400 rounded-full text-xs">Đã giải quyết</span>
      default:
        return null
    }
  }

  const filteredConversations = conversations.filter(conv =>
    conv.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalActive = conversations.filter(c => c.status === 'active').length
  const totalWaiting = conversations.filter(c => c.status === 'waiting').length

  return (
    <div className="h-[calc(100vh-120px)] flex rounded-xl overflow-hidden border border-slate-700 bg-slate-900">
      {/* Conversations List */}
      <div className="w-80 border-r border-slate-700 flex flex-col">
        <div className="p-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            Tin nhắn
          </h2>
          
          {/* Stats */}
          <div className="flex gap-2 mb-3">
            <div className="flex-1 p-2 bg-green-500/10 rounded-lg text-center">
              <p className="text-xs text-slate-400">Đang hỗ trợ</p>
              <p className="text-lg font-bold text-green-400">{totalActive}</p>
            </div>
            <div className="flex-1 p-2 bg-yellow-500/10 rounded-lg text-center">
              <p className="text-xs text-slate-400">Chờ phản hồi</p>
              <p className="text-lg font-bold text-yellow-400">{totalWaiting}</p>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Tìm kiếm hội thoại..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conv) => (
            <motion.button
              key={conv.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setSelectedConversation(conv)}
              className={`w-full p-4 text-left border-b border-slate-700 hover:bg-slate-800/50 transition ${
                selectedConversation?.id === conv.id ? 'bg-slate-800/50' : ''
              }`}
            >
              <div className="flex gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-medium">
                      {conv.userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  {conv.status === 'active' && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-white text-sm truncate">{conv.userName}</p>
                    <span className="text-xs text-slate-500 ml-2">{formatTime(conv.lastMessageTime)}</span>
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{conv.lastMessage}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusBadge(conv.status)}
                    {conv.unreadCount > 0 && (
                      <span className="px-1.5 py-0.5 bg-red-500 text-white rounded-full text-xs">
                        {conv.unreadCount}
                      </span>
                    )}
                    {conv.isTyping && (
                      <span className="text-xs text-blue-400 flex items-center gap-1">
                        <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" />
                        đang nhập...
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedConversation ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-medium">
                  {selectedConversation.userName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-white">{selectedConversation.userName}</h3>
                <p className="text-xs text-slate-400">{selectedConversation.userEmail}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                <Phone className="w-5 h-5 text-slate-400" />
              </button>
              <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                <Video className="w-5 h-5 text-slate-400" />
              </button>
              <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                <MoreVertical className="w-5 h-5 text-slate-400" />
              </button>
              <button className="p-2 hover:bg-red-500/10 rounded-lg transition">
                <Ban className="w-5 h-5 text-red-400" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${message.sender === 'agent' ? 'order-2' : 'order-1'}`}>
                  <div className={`relative p-3 rounded-2xl ${
                    message.sender === 'agent'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-sm'
                      : 'bg-slate-700 text-slate-200 rounded-bl-sm'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <div className={`flex items-center gap-1 mt-1 ${
                      message.sender === 'agent' ? 'justify-end' : 'justify-start'
                    }`}>
                      <span className="text-[10px] opacity-70">
                        {message.timestamp.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {message.sender === 'agent' && (
                        message.status === 'read' ? (
                          <CheckCheck className="w-3 h-3 text-green-400" />
                        ) : (
                          <CheckCheck className="w-3 h-3 text-slate-400" />
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-700 bg-slate-800/30">
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
                placeholder="Nhập phản hồi..."
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
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">Chọn một hội thoại để bắt đầu</p>
            <p className="text-sm text-slate-500 mt-1">Hỗ trợ khách hàng realtime</p>
          </div>
        </div>
      )}
    </div>
  )
}