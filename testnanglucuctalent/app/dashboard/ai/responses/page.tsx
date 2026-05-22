// app/dashboard/ai/responses/page.tsx - Nâng cấp hoàn chỉnh
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  CheckCircle,
  Clock,
  TrendingUp,
  Zap,
  Edit3,
  Copy,
  ThumbsUp,
  Trash2,
  Plus,
  Search,
  Filter,
  X,
  Save,
  Sparkles,
  AlertCircle,
  Check,
  Eye,
  EyeOff,
  Star,
  Download,
  Upload,
  RefreshCw,
  MoreVertical,
} from "lucide-react";
import toast from "react-hot-toast";

interface ResponseItem {
  id: string;
  text: string;
  approved: boolean;
  used: number;
  sentiment: "positive" | "neutral" | "negative";
  createdAt: string;
  lastUsed?: string;
  tags: string[];
  author?: string;
}

// Mock data
const initialResponses: ResponseItem[] = [
  {
    id: "1",
    text: "Cảm ơn bạn đã phản hồi tích cực! Chúng tôi rất vui khi được phục vụ bạn. Hẹn gặp lại!",
    approved: true,
    used: 45,
    sentiment: "positive",
    createdAt: "2024-01-15",
    tags: ["cảm ơn", "tích cực"],
    author: "Admin",
  },
  {
    id: "2",
    text: "Xin lỗi vì trải nghiệm không tốt. Chúng tôi sẽ liên hệ lại trong 24h để hỗ trợ bạn tốt nhất.",
    approved: true,
    used: 38,
    sentiment: "negative",
    createdAt: "2024-01-20",
    tags: ["xin lỗi", "hỗ trợ"],
    author: "Admin",
  },
  {
    id: "3",
    text: "Cảm ơn góp ý của bạn. Chúng tôi sẽ xem xét để cải thiện dịch vụ trong thời gian tới.",
    approved: false,
    used: 12,
    sentiment: "neutral",
    createdAt: "2024-02-01",
    tags: ["góp ý", "cải thiện"],
    author: "Manager",
  },
  {
    id: "4",
    text: "Trân trọng cảm ơn những lời khen của bạn. Đây là động lực để chúng tôi ngày càng hoàn thiện hơn.",
    approved: true,
    used: 28,
    sentiment: "positive",
    createdAt: "2024-02-05",
    tags: ["cảm ơn", "động lực"],
    author: "Admin",
  },
  {
    id: "5",
    text: "Chúng tôi rất tiếc về sự cố này. Đội ngũ kỹ thuật đang khắc phục và sẽ cập nhật sớm.",
    approved: true,
    used: 22,
    sentiment: "negative",
    createdAt: "2024-02-10",
    tags: ["lỗi", "khắc phục"],
    author: "Tech",
  },
];

export default function AIResponsesPage() {
  const [responses, setResponses] = useState<ResponseItem[]>(initialResponses);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSentiment, setFilterSentiment] = useState("all");
  const [filterApproved, setFilterApproved] = useState("all");
  const [editingResponse, setEditingResponse] = useState<ResponseItem | null>(
    null,
  );
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newResponse, setNewResponse] = useState({
    text: "",
    sentiment: "neutral" as const,
    tags: "",
  });
  const [editText, setEditText] = useState("");
  const [editTags, setEditTags] = useState("");
  const [selectedResponses, setSelectedResponses] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Stats
  const stats = {
    total: responses.length,
    approved: responses.filter((r) => r.approved).length,
    approvedPercent:
      responses.length > 0
        ? Math.round(
            (responses.filter((r) => r.approved).length / responses.length) *
              100,
          )
        : 0,
    totalUsed: responses.reduce((sum, r) => sum + r.used, 0),
    positiveCount: responses.filter((r) => r.sentiment === "positive").length,
    negativeCount: responses.filter((r) => r.sentiment === "negative").length,
    neutralCount: responses.filter((r) => r.sentiment === "neutral").length,
  };

  // Filter responses
  const filteredResponses = responses.filter((r) => {
    const matchesSearch =
      searchQuery === "" ||
      r.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    const matchesSentiment =
      filterSentiment === "all" || r.sentiment === filterSentiment;
    const matchesApproved =
      filterApproved === "all" ||
      (filterApproved === "approved" && r.approved) ||
      (filterApproved === "pending" && !r.approved);
    return matchesSearch && matchesSentiment && matchesApproved;
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Đã sao chép phản hồi");
  };

  const handleEdit = (response: ResponseItem) => {
    setEditingResponse(response);
    setEditText(response.text);
    setEditTags(response.tags.join(", "));
  };

  const saveEdit = () => {
    if (!editingResponse) return;
    if (!editText.trim()) {
      toast.error("Vui lòng nhập nội dung phản hồi");
      return;
    }
    setResponses((prev) =>
      prev.map((r) =>
        r.id === editingResponse.id
          ? {
              ...r,
              text: editText.trim(),
              tags: editTags
                .split(",")
                .map((t) => t.trim())
                .filter((t) => t),
            }
          : r,
      ),
    );
    setEditingResponse(null);
    toast.success("Đã cập nhật phản hồi");
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa phản hồi này?")) {
      setResponses((prev) => prev.filter((r) => r.id !== id));
      toast.success("Đã xóa phản hồi");
    }
  };

  const handleAddNew = () => {
    if (!newResponse.text.trim()) {
      toast.error("Vui lòng nhập nội dung phản hồi");
      return;
    }
    const newId = Date.now().toString();
    const newItem: ResponseItem = {
      id: newId,
      text: newResponse.text.trim(),
      approved: false,
      used: 0,
      sentiment: newResponse.sentiment,
      createdAt: new Date().toISOString().split("T")[0],
      tags: newResponse.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
      author: "Admin",
    };
    setResponses((prev) => [newItem, ...prev]);
    setNewResponse({ text: "", sentiment: "neutral", tags: "" });
    setIsAddingNew(false);
    toast.success("Đã thêm phản hồi mới");
  };

  const toggleApprove = (id: string) => {
    setResponses((prev) =>
      prev.map((r) => (r.id === id ? { ...r, approved: !r.approved } : r)),
    );
    toast.success("Đã cập nhật trạng thái duyệt");
  };

  const handleBulkDelete = () => {
    if (selectedResponses.length === 0) return;
    if (confirm(`Xóa ${selectedResponses.length} phản hồi đã chọn?`)) {
      setResponses((prev) =>
        prev.filter((r) => !selectedResponses.includes(r.id)),
      );
      setSelectedResponses([]);
      toast.success(`Đã xóa ${selectedResponses.length} phản hồi`);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedResponses((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const selectAll = () => {
    if (selectedResponses.length === filteredResponses.length) {
      setSelectedResponses([]);
    } else {
      setSelectedResponses(filteredResponses.map((r) => r.id));
    }
  };

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return {
          bg: "bg-green-500/20",
          text: "text-green-400",
          icon: ThumbsUp,
          label: "Tích cực",
        };
      case "negative":
        return {
          bg: "bg-red-500/20",
          text: "text-red-400",
          icon: ThumbsUp,
          label: "Tiêu cực",
        };
      default:
        return {
          bg: "bg-yellow-500/20",
          text: "text-yellow-400",
          icon: MessageSquare,
          label: "Trung tính",
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-7 h-7 text-blue-400" />
            AI Response Library
          </h1>
          <p className="text-slate-400 mt-1">
            Thư viện phản hồi thông minh do AI tạo ra - Quản lý, chỉnh sửa và
            tùy chỉnh
          </p>
        </div>
        <button
          onClick={() => setIsAddingNew(true)}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white text-sm font-medium flex items-center gap-2 transition"
        >
          <Plus className="w-4 h-4" />
          Thêm phản hồi mới
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
          <p className="text-sm text-slate-400">Tổng phản hồi</p>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/30">
          <p className="text-sm text-slate-400">Đã duyệt</p>
          <p className="text-2xl font-bold text-green-400">
            {stats.approvedPercent}%
          </p>
          <div className="h-1 bg-slate-700 rounded-full mt-2">
            <div
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${stats.approvedPercent}%` }}
            />
          </div>
        </div>
        <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/30">
          <p className="text-sm text-slate-400">Đã sử dụng</p>
          <p className="text-2xl font-bold text-blue-400">{stats.totalUsed}</p>
        </div>
        <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/30">
          <p className="text-sm text-slate-400">Tích cực</p>
          <p className="text-2xl font-bold text-green-400">
            {stats.positiveCount}
          </p>
        </div>
        <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/30">
          <p className="text-sm text-slate-400">Tiêu cực</p>
          <p className="text-2xl font-bold text-red-400">
            {stats.negativeCount}
          </p>
        </div>
        <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/30">
          <p className="text-sm text-slate-400">Trung tính</p>
          <p className="text-2xl font-bold text-yellow-400">
            {stats.neutralCount}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Tìm kiếm phản hồi theo nội dung hoặc tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>
        <select
          value={filterSentiment}
          onChange={(e) => setFilterSentiment(e.target.value)}
          className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
        >
          <option value="all">Tất cả cảm xúc</option>
          <option value="positive">👍 Tích cực</option>
          <option value="neutral">😐 Trung tính</option>
          <option value="negative">👎 Tiêu cực</option>
        </select>
        <select
          value={filterApproved}
          onChange={(e) => setFilterApproved(e.target.value)}
          className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="approved">✅ Đã duyệt</option>
          <option value="pending">⏳ Chờ duyệt</option>
        </select>
        <div className="flex gap-1 bg-slate-800 rounded-lg p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`px-3 py-1.5 rounded-md text-sm transition ${viewMode === "grid" ? "bg-blue-600 text-white" : "text-slate-400"}`}
          >
            Lưới
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-3 py-1.5 rounded-md text-sm transition ${viewMode === "list" ? "bg-blue-600 text-white" : "text-slate-400"}`}
          >
            Danh sách
          </button>
        </div>
        {selectedResponses.length > 0 && (
          <button
            onClick={handleBulkDelete}
            className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" /> Xóa ({selectedResponses.length})
          </button>
        )}
        <button
          onClick={() => {
            setSearchQuery("");
            setFilterSentiment("all");
            setFilterApproved("all");
            setSelectedResponses([]);
          }}
          className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white text-sm"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Bulk Actions Bar */}
      {selectedResponses.length > 0 && (
        <div className="p-3 bg-blue-600/20 rounded-lg border border-blue-500/30 flex justify-between items-center">
          <span className="text-sm text-blue-300">
            Đã chọn {selectedResponses.length} phản hồi
          </span>
          <div className="flex gap-2">
            <button
              onClick={selectAll}
              className="px-3 py-1 bg-blue-600/30 rounded-md text-xs text-blue-300"
            >
              Chọn tất cả
            </button>
            <button
              onClick={() => setSelectedResponses([])}
              className="px-3 py-1 bg-slate-700 rounded-md text-xs text-white"
            >
              Bỏ chọn
            </button>
          </div>
        </div>
      )}

      {/* Responses Grid */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResponses.map((response, idx) => {
            const sentimentBadge = getSentimentBadge(response.sentiment);
            const SentimentIcon = sentimentBadge.icon;
            return (
              <motion.div
                key={response.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`relative p-5 bg-slate-800/30 rounded-xl border transition-all hover:scale-[1.02] ${selectedResponses.includes(response.id) ? "border-blue-500 ring-2 ring-blue-500/50" : response.approved ? "border-green-500/30" : "border-yellow-500/30"}`}
              >
                {/* Checkbox */}
                <div className="absolute top-3 left-3">
                  <input
                    type="checkbox"
                    checked={selectedResponses.includes(response.id)}
                    onChange={() => toggleSelect(response.id)}
                    className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-blue-600 focus:ring-blue-500"
                  />
                </div>

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  {response.approved ? (
                    <CheckCircle
                      className="w-5 h-5 text-green-400"
                      title="Đã duyệt"
                    />
                  ) : (
                    <Clock
                      className="w-5 h-5 text-yellow-400"
                      title="Chờ duyệt"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${sentimentBadge.bg} ${sentimentBadge.text}`}
                    >
                      <SentimentIcon className="w-3 h-3" />
                      {sentimentBadge.label}
                    </div>
                    <span className="text-xs text-slate-500">
                      Đã dùng: {response.used} lần
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm mb-3 leading-relaxed">
                    {response.text}
                  </p>

                  {/* Tags */}
                  {response.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {response.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-slate-700 rounded-full text-xs text-slate-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-slate-500 mb-3">
                    Tạo: {response.createdAt} • {response.author || "Admin"}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t border-slate-700">
                    <button
                      onClick={() => copyToClipboard(response.text)}
                      className="flex-1 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs text-white transition flex items-center justify-center gap-1"
                    >
                      <Copy className="w-3 h-3" /> Sao chép
                    </button>
                    <button
                      onClick={() => handleEdit(response)}
                      className="flex-1 px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg text-xs text-blue-400 transition flex items-center justify-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" /> Sửa
                    </button>
                    <button
                      onClick={() => toggleApprove(response.id)}
                      className="px-3 py-1.5 bg-yellow-600/20 hover:bg-yellow-600/30 rounded-lg text-xs text-yellow-400 transition"
                    >
                      {response.approved ? "Bỏ duyệt" : "Duyệt"}
                    </button>
                    <button
                      onClick={() => handleDelete(response.id)}
                      className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 rounded-lg text-xs text-red-400 transition"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-slate-700">
              <tr className="text-left text-slate-400 text-sm">
                <th className="pb-3 w-8">
                  <input
                    type="checkbox"
                    checked={
                      selectedResponses.length === filteredResponses.length &&
                      filteredResponses.length > 0
                    }
                    onChange={selectAll}
                    className="w-4 h-4 rounded"
                  />
                </th>
                <th className="pb-3">Phản hồi</th>
                <th className="pb-3">Cảm xúc</th>
                <th className="pb-3">Trạng thái</th>
                <th className="pb-3">Đã dùng</th>
                <th className="pb-3">Tags</th>
                <th className="pb-3">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredResponses.map((response) => {
                const sentimentBadge = getSentimentBadge(response.sentiment);
                const SentimentIcon = sentimentBadge.icon;
                return (
                  <tr
                    key={response.id}
                    className="border-b border-slate-700/50 hover:bg-slate-800/30"
                  >
                    <td className="py-3">
                      <input
                        type="checkbox"
                        checked={selectedResponses.includes(response.id)}
                        onChange={() => toggleSelect(response.id)}
                        className="w-4 h-4 rounded"
                      />
                    </td>
                    <td className="py-3 max-w-md">
                      <p className="text-slate-300 text-sm truncate">
                        {response.text}
                      </p>
                    </td>
                    <td className="py-3">
                      <div
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${sentimentBadge.bg} ${sentimentBadge.text}`}
                      >
                        <SentimentIcon className="w-3 h-3" />
                        {sentimentBadge.label}
                      </div>
                    </td>
                    <td className="py-3">
                      {response.approved ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <Clock className="w-5 h-5 text-yellow-400" />
                      )}
                    </td>
                    <td className="py-3 text-white">{response.used}</td>
                    <td className="py-3">
                      <div className="flex gap-1">
                        {response.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-1.5 py-0.5 bg-slate-700 rounded text-xs text-slate-400"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-1">
                        <button
                          onClick={() => copyToClipboard(response.text)}
                          className="p-1.5 hover:bg-slate-700 rounded"
                        >
                          <Copy className="w-4 h-4 text-slate-400" />
                        </button>
                        <button
                          onClick={() => handleEdit(response)}
                          className="p-1.5 hover:bg-slate-700 rounded"
                        >
                          <Edit3 className="w-4 h-4 text-blue-400" />
                        </button>
                        <button
                          onClick={() => handleDelete(response.id)}
                          className="p-1.5 hover:bg-slate-700 rounded"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {filteredResponses.length === 0 && (
        <div className="text-center py-16 bg-slate-800/30 rounded-xl border border-slate-700">
          <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400">Không tìm thấy phản hồi nào</p>
          <p className="text-sm text-slate-500 mt-1">
            Thử tìm kiếm với từ khóa khác hoặc thêm phản hồi mới
          </p>
        </div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {editingResponse && (
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
              className="bg-slate-900 rounded-2xl border border-slate-700 p-6 max-w-2xl w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">
                  Chỉnh sửa phản hồi
                </h3>
                <button
                  onClick={() => setEditingResponse(null)}
                  className="p-1 hover:bg-slate-800 rounded"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Nội dung phản hồi
                  </label>
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Tags (cách nhau bằng dấu phẩy)
                  </label>
                  <input
                    type="text"
                    value={editTags}
                    onChange={(e) => setEditTags(e.target.value)}
                    placeholder="cảm ơn, hỗ trợ, chất lượng"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={saveEdit}
                    className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Lưu thay đổi
                  </button>
                  <button
                    onClick={() => setEditingResponse(null)}
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

      {/* Add New Modal */}
      <AnimatePresence>
        {isAddingNew && (
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
              className="bg-slate-900 rounded-2xl border border-slate-700 p-6 max-w-2xl w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">
                  Thêm phản hồi mới
                </h3>
                <button
                  onClick={() => setIsAddingNew(false)}
                  className="p-1 hover:bg-slate-800 rounded"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Nội dung phản hồi
                  </label>
                  <textarea
                    value={newResponse.text}
                    onChange={(e) =>
                      setNewResponse({ ...newResponse, text: e.target.value })
                    }
                    rows={4}
                    placeholder="Nhập nội dung phản hồi..."
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Cảm xúc
                  </label>
                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        setNewResponse({
                          ...newResponse,
                          sentiment: "positive",
                        })
                      }
                      className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 ${newResponse.sentiment === "positive" ? "bg-green-600 text-white" : "bg-slate-800 text-slate-400"}`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      Tích cực
                    </button>
                    <button
                      onClick={() =>
                        setNewResponse({ ...newResponse, sentiment: "neutral" })
                      }
                      className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 ${newResponse.sentiment === "neutral" ? "bg-yellow-600 text-white" : "bg-slate-800 text-slate-400"}`}
                    >
                      <MessageSquare className="w-4 h-4" />
                      Trung tính
                    </button>
                    <button
                      onClick={() =>
                        setNewResponse({
                          ...newResponse,
                          sentiment: "negative",
                        })
                      }
                      className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 ${newResponse.sentiment === "negative" ? "bg-red-600 text-white" : "bg-slate-800 text-slate-400"}`}
                    >
                      <ThumbsUp className="w-4 h-4 rotate-180" />
                      Tiêu cực
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Tags (cách nhau bằng dấu phẩy)
                  </label>
                  <input
                    type="text"
                    value={newResponse.tags}
                    onChange={(e) =>
                      setNewResponse({ ...newResponse, tags: e.target.value })
                    }
                    placeholder="ví dụ: cảm ơn, hỗ trợ"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleAddNew}
                    className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Thêm phản hồi
                  </button>
                  <button
                    onClick={() => setIsAddingNew(false)}
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

      {/* AI Generate Suggestion */}
      <div className="p-6 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-xl border border-purple-500/30">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <div>
              <p className="text-white font-medium">
                AI tự động đề xuất phản hồi
              </p>
              <p className="text-sm text-slate-400">
                AI sẽ học từ các phản hồi của bạn để đề xuất nội dung phù hợp
                hơn
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm font-medium flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Tạo đề xuất bằng AI
          </button>
        </div>
      </div>
    </div>
  );
}
