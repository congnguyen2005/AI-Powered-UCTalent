// app/dashboard/analytics/realtime/page.tsx - Nâng cấp
"use client";

import { useState, useEffect } from "react";
import {
  Activity,
  TrendingUp,
  Users,
  MessageCircle,
  AlertTriangle,
  Zap,
  Clock,
  CheckCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const generateRandomData = () =>
  Array(20)
    .fill(0)
    .map((_, i) => ({
      time: `${i}:00`,
      reviews: Math.floor(Math.random() * 50) + 10,
      sentiment: Math.floor(Math.random() * 30) + 60,
    }));

export default function RealtimeAnalytics() {
  const [liveStats, setLiveStats] = useState({
    currentReviews: 0,
    activeUsers: 0,
    sentiment: 0,
    alerts: 0,
    responseTime: 0,
  });
  const [chartData, setChartData] = useState(generateRandomData());

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats({
        currentReviews: Math.floor(Math.random() * 50),
        activeUsers: Math.floor(Math.random() * 20) + 5,
        sentiment: Math.floor(Math.random() * 30) + 70,
        alerts: Math.floor(Math.random() * 3),
        responseTime: Number((Math.random() * 3 + 1).toFixed(1)),
      });
      setChartData((prev) => [
        ...prev.slice(1),
        {
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
          reviews: Math.floor(Math.random() * 50) + 10,
          sentiment: Math.floor(Math.random() * 30) + 60,
        },
      ]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Activity className="w-7 h-7 text-green-400" /> Realtime Analytics
        </h1>
        <p className="text-slate-400 mt-1">
          Phân tích theo thời gian thực - Cập nhật mỗi 3 giây
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="p-5 bg-slate-800/30 rounded-xl border border-slate-700">
          <p className="text-sm text-slate-400">Review mới</p>
          <p className="text-3xl font-bold text-white animate-pulse">
            {liveStats.currentReviews}
          </p>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mt-2" />
        </div>
        <div className="p-5 bg-slate-800/30 rounded-xl border border-slate-700">
          <p className="text-sm text-slate-400">Đang truy cập</p>
          <p className="text-3xl font-bold text-blue-400">
            {liveStats.activeUsers}
          </p>
          <Users className="w-4 h-4 text-blue-400 mt-2" />
        </div>
        <div className="p-5 bg-slate-800/30 rounded-xl border border-slate-700">
          <p className="text-sm text-slate-400">Sentiment Score</p>
          <p className="text-3xl font-bold text-green-400">
            {liveStats.sentiment}%
          </p>
          <TrendingUp
            className={`w-4 h-4 ${liveStats.sentiment > 70 ? "text-green-400" : "text-red-400"} mt-2`}
          />
        </div>
        <div className="p-5 bg-slate-800/30 rounded-xl border border-slate-700">
          <p className="text-sm text-slate-400">TG phản hồi TB</p>
          <p className="text-3xl font-bold text-purple-400">
            {liveStats.responseTime}s
          </p>
          <Clock className="w-4 h-4 text-purple-400 mt-2" />
        </div>
        <div className="p-5 bg-red-500/10 rounded-xl border border-red-500/30">
          <p className="text-sm text-slate-400">Cảnh báo</p>
          <p className="text-3xl font-bold text-red-400">{liveStats.alerts}</p>
          <AlertTriangle className="w-4 h-4 text-red-400 mt-2" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-green-400">
              Live Data Stream Active
            </span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "none" }}
                />
                <Area
                  type="monotone"
                  dataKey="reviews"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                  name="Reviews"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            Xu hướng cảm xúc realtime
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "none" }}
                />
                <Line
                  type="monotone"
                  dataKey="sentiment"
                  stroke="#22c55e"
                  strokeWidth={2}
                  name="Sentiment %"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gradient-to-r from-green-600/10 to-blue-600/10 rounded-xl border border-green-500/30">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 text-yellow-400" />
            <div>
              <p className="text-white font-medium">
                Hệ thống đang hoạt động bình thường
              </p>
              <p className="text-sm text-slate-400">
                Tất cả các chỉ số đều trong ngưỡng an toàn
              </p>
            </div>
          </div>
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
      </div>
    </div>
  );
}
