// app/dashboard/crisis/page.tsx - Nâng cấp hoàn chỉnh
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Shield,
  Clock,
  Eye,
  Send,
  CheckCircle,
  XCircle,
  TrendingUp,
  Bell,
  Zap,
  Flag,
  Users,
  MessageCircle,
  Phone,
  Mail,
  FileText,
  BarChart3,
  Activity,
  Target,
  Award,
  Calendar,
  Filter,
  Search,
  Plus,
  MoreVertical,
  Edit3,
  Trash2,
  RefreshCw,
  Download,
  EyeOff,
  Volume2,
  VolumeX,
  ThumbsUp,
  ThumbsDown,
  Link2,
  Share2,
  AlertOctagon,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Types
interface CrisisEvent {
  id: string;
  title: string;
  description: string;
  author: string;
  authorEmail: string;
  rating: number;
  text: string;
  riskLevel: "critical" | "high" | "medium" | "low";
  timestamp: string;
  status: "pending" | "investigating" | "resolved" | "false_alarm";
  assignedTo?: string;
  resolvedBy?: string;
  resolvedAt?: string;
  resolutionNotes?: string;
  viralPotential: number;
  legalRisk: boolean;
  suggestedAction: string;
  suggestedResponseTime: number;
  tags: string[];
  source: "google" | "facebook" | "tripadvisor" | "other";
}

// Mock crisis data
const mockCrisisEvents: CrisisEvent[] = [
  {
    id: "1",
    title: "Sự cố vệ sinh nghiêm trọng",
    description:
      "Khách hàng phát hiện rệp trong phòng và đe dọa đăng lên mạng xã hội",
    author: "Phạm Thị D",
    authorEmail: "phamthid@email.com",
    rating: 1,
    text: "THẢM HỌA! Phòng bẩn, giường có rệp, nhân viên thô lỗ. Tôi sẽ đăng bài này lên các hội nhóm để mọi người biết!",
    riskLevel: "critical",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    status: "pending",
    viralPotential: 0.95,
    legalRisk: false,
    suggestedAction:
      "Phản hồi khẩn cấp trong 15 phút, liên hệ trực tiếp khách hàng, đề xuất bồi thường",
    suggestedResponseTime: 15,
    tags: ["vệ sinh", "rệp", "viral"],
    source: "google",
  },
  {
    id: "2",
    title: "Đe dọa kiện tụng",
    description: "Khách hàng đe dọa kiện vì dịch vụ không đúng cam kết",
    author: "Nguyễn Văn B",
    authorEmail: "nguyenvanb@email.com",
    rating: 1,
    text: "Dịch vụ quá tệ, tôi sẽ kiện các bạn vì đã lừa dối khách hàng. Đã ghi âm lại toàn bộ cuộc trò chuyện.",
    riskLevel: "high",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    status: "investigating",
    assignedTo: "Nguyễn Văn A (Manager)",
    viralPotential: 0.6,
    legalRisk: true,
    suggestedAction:
      "Phối hợp với bộ phận pháp lý, thu thập bằng chứng, chuẩn bị phương án đối phó",
    suggestedResponseTime: 30,
    tags: ["kiện tụng", "pháp lý"],
    source: "facebook",
  },
  {
    id: "3",
    title: "Báo chí đưa tin",
    description: "Khách hàng đã liên hệ với báo chí về sự việc",
    author: "Trần Thị C",
    authorEmail: "tranthic@email.com",
    rating: 2,
    text: "Tôi đã gửi thông tin này cho báo Tuổi Trẻ và sẽ theo dõi phản hồi của các bạn.",
    riskLevel: "high",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    status: "investigating",
    assignedTo: "Lê Văn C (PR Manager)",
    viralPotential: 0.8,
    legalRisk: false,
    suggestedAction:
      "Chuẩn bị thông cáo báo chí, liên hệ với phóng viên để làm rõ",
    suggestedResponseTime: 45,
    tags: ["báo chí", "truyền thông"],
    source: "other",
  },
  {
    id: "4",
    title: "Phản hồi tiêu cực lan rộng",
    description: "Nhiều khách hàng cùng phản ánh về vấn đề chất lượng dịch vụ",
    author: "Nhiều khách hàng",
    authorEmail: "",
    rating: 2,
    text: "Nhiều đánh giá 1-2 sao trong 24h qua về cùng một vấn đề chất lượng phòng",
    riskLevel: "medium",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    status: "resolved",
    assignedTo: "Đội ngũ QA",
    resolvedBy: "Nguyễn Văn A",
    resolvedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    resolutionNotes: "Đã khắc phục vấn đề và cập nhật quy trình kiểm tra",
    viralPotential: 0.3,
    legalRisk: false,
    suggestedAction: "Rà soát quy trình, đào tạo lại nhân viên",
    suggestedResponseTime: 60,
    tags: ["chất lượng", "hàng loạt"],
    source: "tripadvisor",
  },
];

// Chart data
const weeklyTrendData = [
  { date: "Thứ 2", critical: 0, high: 1, medium: 2, low: 5 },
  { date: "Thứ 3", critical: 0, high: 1, medium: 1, low: 3 },
  { date: "Thứ 4", critical: 1, high: 0, medium: 2, low: 4 },
  { date: "Thứ 5", critical: 1, high: 2, medium: 1, low: 2 },
  { date: "Thứ 6", critical: 0, high: 1, medium: 3, low: 6 },
  { date: "Thứ 7", critical: 0, high: 0, medium: 1, low: 4 },
  { date: "Chủ nhật", critical: 0, high: 0, medium: 0, low: 2 },
];

const statusData = [
  { name: "Chờ xử lý", value: 1, color: "#ef4444" },
  { name: "Đang điều tra", value: 2, color: "#f59e0b" },
  { name: "Đã xử lý", value: 1, color: "#22c55e" },
];

const severityData = [
  { name: "Nguy cấp", value: 1, color: "#ef4444" },
  { name: "Cao", value: 2, color: "#f97316" },
  { name: "Trung bình", value: 1, color: "#eab308" },
];

export default function CrisisCenter() {
  const [crisisEvents, setCrisisEvents] =
    useState<CrisisEvent[]>(mockCrisisEvents);
  const [selectedEvent, setSelectedEvent] = useState<CrisisEvent | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [resolutionNotes, setResolutionNotes] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRisk, setFilterRisk] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Stats
  const stats = {
    critical: crisisEvents.filter(
      (e) => e.riskLevel === "critical" && e.status !== "resolved",
    ).length,
    high: crisisEvents.filter(
      (e) => e.riskLevel === "high" && e.status !== "resolved",
    ).length,
    medium: crisisEvents.filter(
      (e) => e.riskLevel === "medium" && e.status !== "resolved",
    ).length,
    low: crisisEvents.filter(
      (e) => e.riskLevel === "low" && e.status !== "resolved",
    ).length,
    pending: crisisEvents.filter((e) => e.status === "pending").length,
    investigating: crisisEvents.filter((e) => e.status === "investigating")
      .length,
    resolved: crisisEvents.filter((e) => e.status === "resolved").length,
    avgResponseTime: 28,
    responseRate: 85,
  };

  // Auto refresh
  useEffect(() => {
    if (!isAutoRefresh) return;
    const interval = setInterval(() => {
      setLastUpdated(new Date());
      // Simulate new data check
      toast.success("Đã cập nhật dữ liệu khủng hoảng", { icon: "🔄" });
    }, 30000);
    return () => clearInterval(interval);
  }, [isAutoRefresh]);

  const getRiskColor = (level: string) => {
    switch (level) {
      case "critical":
        return {
          bg: "bg-red-500/20",
          border: "border-red-500/30",
          text: "text-red-400",
          badge: "bg-red-500",
          label: "⚠️ NGUY CẤP",
        };
      case "high":
        return {
          bg: "bg-orange-500/20",
          border: "border-orange-500/30",
          text: "text-orange-400",
          badge: "bg-orange-500",
          label: "CAO",
        };
      case "medium":
        return {
          bg: "bg-yellow-500/20",
          border: "border-yellow-500/30",
          text: "text-yellow-400",
          badge: "bg-yellow-500",
          label: "TRUNG BÌNH",
        };
      default:
        return {
          bg: "bg-blue-500/20",
          border: "border-blue-500/30",
          text: "text-blue-400",
          badge: "bg-blue-500",
          label: "THẤP",
        };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return {
          bg: "bg-red-500/20",
          text: "text-red-400",
          icon: AlertTriangle,
          label: "Chờ xử lý",
        };
      case "investigating":
        return {
          bg: "bg-yellow-500/20",
          text: "text-yellow-400",
          icon: Activity,
          label: "Đang điều tra",
        };
      case "resolved":
        return {
          bg: "bg-green-500/20",
          text: "text-green-400",
          icon: CheckCircle,
          label: "Đã xử lý",
        };
      default:
        return {
          bg: "bg-slate-500/20",
          text: "text-slate-400",
          icon: XCircle,
          label: "False alarm",
        };
    }
  };

  const handleAssignToMe = (eventId: string) => {
    setCrisisEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? {
              ...e,
              status: "investigating",
              assignedTo: "Đặng Công Nguyên (Staff)",
            }
          : e,
      ),
    );
    toast.success("Đã nhận xử lý khủng hoảng");
  };

  const handleResolve = () => {
    if (!selectedEvent) return;
    if (!resolutionNotes.trim()) {
      toast.error("Vui lòng nhập ghi chú giải quyết");
      return;
    }
    setCrisisEvents((prev) =>
      prev.map((e) =>
        e.id === selectedEvent.id
          ? {
              ...e,
              status: "resolved",
              resolvedBy: "Đặng Công Nguyên",
              resolvedAt: new Date().toISOString(),
              resolutionNotes,
            }
          : e,
      ),
    );
    setShowResolveModal(false);
    setResolutionNotes("");
    setSelectedEvent(null);
    toast.success("Đã xác nhận giải quyết khủng hoảng");
  };

  const filteredEvents = crisisEvents.filter((e) => {
    const matchesStatus = filterStatus === "all" || e.status === filterStatus;
    const matchesRisk = filterRisk === "all" || e.riskLevel === filterRisk;
    const matchesSearch =
      searchQuery === "" ||
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.text.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesRisk && matchesSearch;
  });

  const formatTime = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Vừa xong";
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    return `${days} ngày trước`;
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "google":
        return <div className="w-4 h-4 bg-blue-500 rounded-full" />;
      case "facebook":
        return <div className="w-4 h-4 bg-blue-600 rounded-full" />;
      case "tripadvisor":
        return <div className="w-4 h-4 bg-green-500 rounded-full" />;
      default:
        return <div className="w-4 h-4 bg-slate-500 rounded-full" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-7 h-7 text-red-400" />
            Trung tâm khủng hoảng
          </h1>
          <p className="text-slate-400 mt-1">
            Phát hiện và xử lý khủng hoảng truyền thông realtime
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsAutoRefresh(!isAutoRefresh)}
            className={`px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition ${isAutoRefresh ? "bg-green-600/20 text-green-400 border border-green-500/30" : "bg-slate-800 text-slate-400"}`}
          >
            {isAutoRefresh ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
            Tự động {isAutoRefresh ? "Bật" : "Tắt"}
          </button>
          <button className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm flex items-center gap-2">
            <Download className="w-4 h-4" />
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Alert Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/30">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <p className="text-sm text-slate-400">Nguy cấp</p>
          </div>
          <p className="text-3xl font-bold text-red-400">{stats.critical}</p>
          <p className="text-xs text-red-400/70 mt-1">Cần xử lý ngay</p>
        </div>
        <div className="p-4 bg-orange-500/10 rounded-xl border border-orange-500/30">
          <div className="flex items-center gap-2 mb-1">
            <Flag className="w-5 h-5 text-orange-400" />
            <p className="text-sm text-slate-400">Cảnh báo cao</p>
          </div>
          <p className="text-3xl font-bold text-orange-400">{stats.high}</p>
          <p className="text-xs text-orange-400/70 mt-1">Theo dõi sát</p>
        </div>
        <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/30">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <p className="text-sm text-slate-400">Trung bình</p>
          </div>
          <p className="text-3xl font-bold text-yellow-400">{stats.medium}</p>
          <p className="text-xs text-yellow-400/70 mt-1">Cần phản hồi</p>
        </div>
        <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/30">
          <div className="flex items-center gap-2 mb-1">
            <Bell className="w-5 h-5 text-blue-400" />
            <p className="text-sm text-slate-400">Thấp</p>
          </div>
          <p className="text-3xl font-bold text-blue-400">{stats.low}</p>
          <p className="text-xs text-blue-400/70 mt-1">Theo dõi</p>
        </div>
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-5 h-5 text-purple-400" />
            <p className="text-sm text-slate-400">TG xử lý TB</p>
          </div>
          <p className="text-3xl font-bold text-purple-400">
            {stats.avgResponseTime} phút
          </p>
          <p className="text-xs text-green-400 mt-1">↓ 5% so với tuần trước</p>
        </div>
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-5 h-5 text-green-400" />
            <p className="text-sm text-slate-400">Tỷ lệ xử lý</p>
          </div>
          <p className="text-3xl font-bold text-green-400">
            {stats.responseRate}%
          </p>
          <p className="text-xs text-green-400 mt-1">+12% so với tuần trước</p>
        </div>
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <p className="text-sm text-slate-400">Đã xử lý</p>
          </div>
          <p className="text-3xl font-bold text-green-400">{stats.resolved}</p>
          <p className="text-xs text-green-400 mt-1">Trong 24h qua</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Trend Chart */}
        <div className="p-5 bg-slate-800/30 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" /> Xu hướng khủng
            hoảng 7 ngày
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "none",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="critical"
                  stackId="1"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.6}
                  name="Nguy cấp"
                />
                <Area
                  type="monotone"
                  dataKey="high"
                  stackId="1"
                  stroke="#f97316"
                  fill="#f97316"
                  fillOpacity={0.6}
                  name="Cao"
                />
                <Area
                  type="monotone"
                  dataKey="medium"
                  stackId="1"
                  stroke="#eab308"
                  fill="#eab308"
                  fillOpacity={0.6}
                  name="Trung bình"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status & Severity Charts */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-5 bg-slate-800/30 rounded-xl border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">
              Trạng thái
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {statusData.map((entry, idx) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="p-5 bg-slate-800/30 rounded-xl border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">
              Mức độ nghiêm trọng
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={severityData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {severityData.map((entry, idx) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Tìm kiếm khủng hoảng..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="pending">⏳ Chờ xử lý</option>
          <option value="investigating">🔍 Đang điều tra</option>
          <option value="resolved">✅ Đã xử lý</option>
        </select>
        <select
          value={filterRisk}
          onChange={(e) => setFilterRisk(e.target.value)}
          className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
        >
          <option value="all">Tất cả mức độ</option>
          <option value="critical">🔴 Nguy cấp</option>
          <option value="high">🟠 Cao</option>
          <option value="medium">🟡 Trung bình</option>
          <option value="low">🔵 Thấp</option>
        </select>
        <button
          onClick={() => {
            setFilterStatus("all");
            setFilterRisk("all");
            setSearchQuery("");
          }}
          className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white text-sm flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Làm mới
        </button>
        <div className="flex items-center gap-2 ml-auto">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-slate-500">
            Cập nhật lúc {lastUpdated.toLocaleTimeString("vi-VN")}
          </span>
        </div>
      </div>

      {/* Crisis Events List */}
      <div className="space-y-4">
        {filteredEvents.map((event, idx) => {
          const risk = getRiskColor(event.riskLevel);
          const status = getStatusBadge(event.status);
          const StatusIcon = status.icon;
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-5 rounded-xl border ${risk.border} ${risk.bg} backdrop-blur-sm cursor-pointer hover:scale-[1.01] transition`}
              onClick={() => {
                setSelectedEvent(event);
                setShowDetailModal(true);
              }}
            >
              <div className="flex justify-between items-start mb-4 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${risk.bg} flex items-center justify-center`}
                  >
                    <AlertTriangle className={`w-5 h-5 ${risk.text}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-white">{event.author}</p>
                      <div
                        className={`px-2 py-0.5 rounded-full text-xs font-medium border ${risk.border} ${risk.text}`}
                      >
                        {risk.label}
                      </div>
                      <div
                        className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${status.bg} ${status.text}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </div>
                      {event.legalRisk && (
                        <div className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">
                          ⚠️ Có rủi ro pháp lý
                        </div>
                      )}
                      {event.viralPotential > 0.7 && (
                        <div className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
                          📢 Nguy cơ viral cao
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-slate-500">
                        {formatTime(event.timestamp)}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        {getSourceIcon(event.source)} {event.source}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {event.status === "pending" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAssignToMe(event.id);
                      }}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition flex items-center gap-1"
                    >
                      <Zap className="w-3 h-3" /> Xử lý ngay
                    </button>
                  )}
                  <button className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Chi tiết
                  </button>
                </div>
              </div>
              <p className="text-slate-300 mb-3 line-clamp-2">{event.text}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />{" "}
                  <span className="text-slate-500">
                    TG xử lý đề xuất:{" "}
                    <span className="text-yellow-400">
                      {event.suggestedResponseTime} phút
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3 text-slate-500" />{" "}
                  <span className="text-slate-500">
                    Khả năng viral:{" "}
                    <span
                      className={
                        event.viralPotential > 0.7
                          ? "text-red-400"
                          : "text-yellow-400"
                      }
                    >
                      {Math.round(event.viralPotential * 100)}%
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Send className="w-3 h-3 text-slate-500" />{" "}
                  <span className="text-slate-500">
                    Hành động:{" "}
                    <span className="text-blue-400">
                      {event.suggestedAction.slice(0, 50)}...
                    </span>
                  </span>
                </div>
              </div>
              {event.assignedTo && (
                <div className="mt-3 pt-3 border-t border-slate-700/50 flex items-center gap-2 text-xs">
                  <Users className="w-3 h-3 text-slate-500" />
                  <span className="text-slate-500">Đang xử lý bởi:</span>
                  <span className="text-blue-400">{event.assignedTo}</span>
                </div>
              )}
              {event.resolvedAt && (
                <div className="mt-2 flex items-center gap-2 text-xs">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span className="text-slate-500">Đã giải quyết lúc:</span>
                  <span className="text-green-400">
                    {new Date(event.resolvedAt).toLocaleString("vi-VN")}
                  </span>
                  <span className="text-slate-500">bởi</span>
                  <span className="text-green-400">{event.resolvedBy}</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* AI Recommendations */}
      <div className="p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-500/30">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" /> AI Recommendations
        </h3>
        <div className="space-y-3">
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
            <p className="text-sm text-blue-300 font-medium">
              📢 Khuyến nghị xử lý khủng hoảng tổng thể
            </p>
            <p className="text-xs text-slate-400 mt-2">
              • Phản hồi trong vòng 15 phút đối với cảnh báo nguy cấp
              <br />• Liên hệ trực tiếp với khách hàng qua điện thoại hoặc email
              <br />• Chuẩn bị phương án bồi thường và thông cáo báo chí
              <br />• Thông báo ngay cho ban giám đốc và bộ phận pháp lý
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/30">
              <p className="text-xs text-green-300">
                ✅ Đã xử lý thành công: {stats.resolved} khủng hoảng
              </p>
            </div>
            <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
              <p className="text-xs text-yellow-300">
                ⏳ Đang xử lý: {stats.investigating} khủng hoảng
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {showDetailModal && selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 rounded-2xl border border-slate-700 p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">
                  Chi tiết khủng hoảng
                </h3>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="p-1 hover:bg-slate-800 rounded"
                >
                  <XCircle className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <p className="text-lg font-semibold text-white">
                    {selectedEvent.title}
                  </p>
                  <p className="text-sm text-slate-400 mt-1">
                    ID: {selectedEvent.id} |{" "}
                    {new Date(selectedEvent.timestamp).toLocaleString("vi-VN")}
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-slate-400">Khách hàng</label>
                    <p className="text-white">{selectedEvent.author}</p>
                    <p className="text-xs text-slate-500">
                      {selectedEvent.authorEmail}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-slate-400">Nguồn</label>
                    <p className="text-white capitalize">
                      {selectedEvent.source}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-slate-400">
                    Nội dung đánh giá
                  </label>
                  <div className="p-3 bg-slate-800/50 rounded-lg">
                    <p className="text-slate-300">{selectedEvent.text}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-slate-400">
                    Đánh giá rủi ro
                  </label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="p-2 bg-red-500/10 rounded">
                      <p className="text-xs text-slate-400">Mức độ</p>
                      <p className="text-red-400 font-bold uppercase">
                        {selectedEvent.riskLevel}
                      </p>
                    </div>
                    <div className="p-2 bg-purple-500/10 rounded">
                      <p className="text-xs text-slate-400">Khả năng viral</p>
                      <p className="text-purple-400 font-bold">
                        {Math.round(selectedEvent.viralPotential * 100)}%
                      </p>
                    </div>
                    <div className="p-2 bg-yellow-500/10 rounded">
                      <p className="text-xs text-slate-400">TG xử lý đề xuất</p>
                      <p className="text-yellow-400 font-bold">
                        {selectedEvent.suggestedResponseTime} phút
                      </p>
                    </div>
                    <div className="p-2 bg-orange-500/10 rounded">
                      <p className="text-xs text-slate-400">Rủi ro pháp lý</p>
                      <p className="text-orange-400 font-bold">
                        {selectedEvent.legalRisk ? "Có" : "Không"}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-slate-400">
                    Hành động đề xuất
                  </label>
                  <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                    <p className="text-blue-300 text-sm">
                      {selectedEvent.suggestedAction}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-slate-400">Tags</label>
                  <div className="flex gap-2 mt-1">
                    {selectedEvent.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-slate-700 rounded-full text-xs text-slate-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  {selectedEvent.status === "pending" && (
                    <button
                      onClick={() => {
                        handleAssignToMe(selectedEvent.id);
                        setShowDetailModal(false);
                      }}
                      className="flex-1 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium flex items-center justify-center gap-2"
                    >
                      <Zap className="w-4 h-4" /> Nhận xử lý ngay
                    </button>
                  )}
                  {selectedEvent.status === "investigating" && (
                    <button
                      onClick={() => {
                        setShowResolveModal(true);
                        setShowDetailModal(false);
                      }}
                      className="flex-1 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" /> Xác nhận giải quyết
                    </button>
                  )}
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-medium"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resolve Modal */}
      <AnimatePresence>
        {showResolveModal && selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 rounded-2xl border border-slate-700 p-6 max-w-lg w-full"
            >
              <h3 className="text-xl font-bold text-white mb-4">
                Xác nhận giải quyết
              </h3>
              <div className="space-y-4">
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <p className="text-sm text-slate-300">
                    <strong className="text-white">Khủng hoảng:</strong>{" "}
                    {selectedEvent.title}
                  </p>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Ghi chú giải quyết
                  </label>
                  <textarea
                    rows={4}
                    value={resolutionNotes}
                    onChange={(e) => setResolutionNotes(e.target.value)}
                    placeholder="Mô tả cách đã giải quyết vấn đề..."
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-green-500"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleResolve}
                    className="flex-1 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium"
                  >
                    Xác nhận giải quyết
                  </button>
                  <button
                    onClick={() => {
                      setShowResolveModal(false);
                      setResolutionNotes("");
                    }}
                    className="flex-1 py-3 bg-slate-700 rounded-lg text-white font-medium"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
