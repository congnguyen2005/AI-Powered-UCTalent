// app/dashboard/reviews/page.tsx - Nâng cấp
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Star,
  ThumbsUp,
  ThumbsDown,
  Minus,
  AlertTriangle,
  Zap,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";
import toast from "react-hot-toast";

const mockReviews = [
  {
    id: "1",
    rating: 5,
    text: "Dịch vụ tuyệt vời! Nhân viên thân thiện, phòng ốc sạch sẽ.",
    author_name: "Nguyễn Văn A",
    date: new Date().toISOString(),
    sentiment: "positive",
    priority: "low",
    status: "pending",
  },
  {
    id: "2",
    rating: 2,
    text: "Phòng hơi cũ, điều hòa không mát. Cần cải thiện.",
    author_name: "Trần Thị B",
    date: new Date().toISOString(),
    sentiment: "negative",
    priority: "high",
    status: "pending",
  },
  {
    id: "3",
    rating: 1,
    text: "THẢM HỌA! Phòng bẩn, giường có rệp, nhân viên thô lỗ.",
    author_name: "Phạm Thị D",
    date: new Date().toISOString(),
    sentiment: "negative",
    priority: "critical",
    status: "pending",
  },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(mockReviews);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    sentiment: "all",
    priority: "all",
    search: "",
  });
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [aiResponses, setAiResponses] = useState<string[]>([]);
  const [generatingAI, setGeneratingAI] = useState(false);

  const generateAIResponse = async (review: any) => {
    setGeneratingAI(true);
    setSelectedReview(review);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const responses = [
      `Cảm ơn ${review.author_name} đã phản hồi. Chúng tôi đã ghi nhận và sẽ cải thiện.`,
      `Kính gửi anh/chị ${review.author_name}, chúng tôi rất tiếc về trải nghiệm này.`,
      `Xin lỗi bạn! Đội ngũ hỗ trợ sẽ liên hệ ngay.`,
    ];
    setAiResponses(responses);
    setGeneratingAI(false);
  };

  const approveResponse = async (reviewId: string, response: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, status: "approved" } : r)),
    );
    setSelectedReview(null);
    setAiResponses([]);
    toast.success("Đã phê duyệt phản hồi!");
  };

  const filteredReviews = reviews.filter((r) => {
    if (filters.sentiment !== "all" && r.sentiment !== filters.sentiment)
      return false;
    if (filters.priority !== "all" && r.priority !== filters.priority)
      return false;
    if (
      filters.search &&
      !r.text.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;
    return true;
  });

  const stats = {
    total: reviews.length,
    pending: reviews.filter((r) => r.status === "pending").length,
    critical: reviews.filter((r) => r.priority === "critical").length,
    approved: reviews.filter((r) => r.status === "approved").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Star className="w-7 h-7 text-yellow-400" /> Quản lý đánh giá
        </h1>
        <p className="text-slate-400 mt-1">
          Xem, phân tích và phản hồi đánh giá khách hàng
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
          <p className="text-sm text-slate-400">Tổng số</p>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
          <p className="text-sm text-slate-400">Chờ xử lý</p>
          <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
        </div>
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
          <p className="text-sm text-slate-400">Nguy cấp</p>
          <p className="text-2xl font-bold text-red-400">{stats.critical}</p>
        </div>
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
          <p className="text-sm text-slate-400">Đã xử lý</p>
          <p className="text-2xl font-bold text-green-400">{stats.approved}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
          />
        </div>
        <select
          value={filters.sentiment}
          onChange={(e) =>
            setFilters({ ...filters, sentiment: e.target.value })
          }
          className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
        >
          <option value="all">Tất cả cảm xúc</option>
          <option value="positive">Tích cực</option>
          <option value="neutral">Trung tính</option>
          <option value="negative">Tiêu cực</option>
        </select>
        <select
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
          className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
        >
          <option value="all">Tất cả mức độ</option>
          <option value="low">Thấp</option>
          <option value="medium">Trung bình</option>
          <option value="high">Cao</option>
          <option value="critical">Nguy cấp</option>
        </select>
      </div>
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className={`p-5 rounded-xl border ${review.priority === "critical" ? "border-red-500/50 bg-red-500/10" : "border-slate-700 bg-slate-800/30"}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold">
                    {review.author_name?.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-600"}`}
                        />
                      ))}
                    </div>
                    <span className="text-white font-semibold">
                      {review.author_name}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {new Date(review.date).toLocaleDateString("vi-VN")}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${review.sentiment === "positive" ? "bg-green-500/20 text-green-400" : review.sentiment === "negative" ? "bg-red-500/20 text-red-400" : "bg-slate-500/20"}`}
                >
                  {review.sentiment === "positive"
                    ? "Tích cực"
                    : review.sentiment === "negative"
                      ? "Tiêu cực"
                      : "Trung tính"}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${review.priority === "critical" ? "bg-red-500/20 text-red-400" : review.priority === "high" ? "bg-orange-500/20" : "bg-blue-500/20"}`}
                >
                  {review.priority === "critical"
                    ? "NGUY CẤP"
                    : review.priority === "high"
                      ? "Cao"
                      : "Thấp"}
                </span>
              </div>
            </div>
            <p className="text-slate-300 mb-4">{review.text}</p>
            {review.status === "approved" ? (
              <div className="p-3 bg-green-500/10 rounded-lg text-green-400 text-sm">
                ✓ Đã phản hồi
              </div>
            ) : selectedReview?.id === review.id && aiResponses.length > 0 ? (
              <div className="space-y-3">
                {aiResponses.map((resp, i) => (
                  <div
                    key={i}
                    className="p-3 bg-slate-700/50 rounded-lg cursor-pointer hover:bg-slate-700"
                  >
                    {resp}
                  </div>
                ))}
                <div className="flex gap-2">
                  <button
                    onClick={() => approveResponse(review.id, aiResponses[0])}
                    className="px-4 py-2 bg-green-600 rounded-lg text-white"
                  >
                    Duyệt
                  </button>
                  <button
                    onClick={() => {
                      setSelectedReview(null);
                      setAiResponses([]);
                    }}
                    className="px-4 py-2 bg-red-600/20 rounded-lg text-red-300"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => generateAIResponse(review)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white flex items-center gap-2"
              >
                <Zap className="w-4 h-4" /> Tạo phản hồi AI
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
