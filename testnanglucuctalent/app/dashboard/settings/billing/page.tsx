// app/dashboard/settings/billing/page.tsx - Nâng cấp chức năng mua gói
"use client";

import { useState } from "react";
import {
  CreditCard,
  CheckCircle,
  Zap,
  Shield,
  Star,
  Crown,
  Sparkles,
  ArrowRight,
  DollarSign,
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 49,
    period: "tháng",
    description: "Dành cho doanh nghiệp nhỏ",
    features: [
      "500 reviews/tháng",
      "AI phản hồi cơ bản",
      "Phân tích cảm xúc",
      "Email hỗ trợ",
    ],
    popular: false,
    icon: Star,
    color: "blue",
  },
  {
    id: "professional",
    name: "Professional",
    price: 149,
    period: "tháng",
    description: "Dành cho doanh nghiệp phát triển",
    features: [
      "5,000 reviews/tháng",
      "AI phản hồi nâng cao",
      "Phát hiện khủng hoảng realtime",
      "Hỗ trợ 24/7",
      "Phân tích nâng cao",
      "Đa chi nhánh",
      "API access",
    ],
    popular: true,
    icon: Crown,
    color: "purple",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: null,
    period: "",
    description: "Dành cho tập đoàn lớn",
    features: [
      "Không giới hạn reviews",
      "AI tùy chỉnh",
      "Dedicated AI instance",
      "Hỗ trợ 24/7 chuyên dụng",
      "SLA 99.9%",
      "Triển khai on-premise",
    ],
    popular: false,
    icon: Shield,
    color: "gold",
  },
];

export default function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState("professional");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  const handleUpgrade = (planId: string) => {
    setSelectedPlan(planId);
    setShowPayment(true);
  };

  const handlePayment = () => {
    toast.success("Nâng cấp gói thành công! Cảm ơn bạn đã tin tưởng.");
    setCurrentPlan(selectedPlan!);
    setShowPayment(false);
    setSelectedPlan(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <CreditCard className="w-7 h-7 text-green-400" /> Thanh toán & Gói
          cước
        </h1>
        <p className="text-slate-400 mt-1">Quản lý gói dịch vụ và thanh toán</p>
      </div>

      {/* Current Plan */}
      <div className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-xl border border-green-500/30">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <p className="text-sm text-slate-400">Gói hiện tại</p>
            <p className="text-2xl font-bold text-white">
              {plans.find((p) => p.id === currentPlan)?.name}
            </p>
            <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> Đang hoạt động
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400">Hạn sử dụng</p>
            <p className="text-white font-medium">15/04/2025</p>
            <p className="text-xs text-slate-500">Gia hạn tự động hàng tháng</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-green-500/20 flex justify-between">
          <span className="text-slate-400">Số dư</span>
          <span className="text-white font-bold">
            ${plans.find((p) => p.id === currentPlan)?.price || "Liên hệ"}/
            {plans.find((p) => p.id === currentPlan)?.period || ""}
          </span>
        </div>
      </div>

      {/* Available Plans */}
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan, idx) => {
          const Icon = plan.icon;
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative p-6 rounded-2xl border transition-all ${plan.popular ? "bg-gradient-to-br from-purple-600/20 to-blue-600/20 border-purple-500/50 shadow-lg shadow-purple-500/10" : "bg-slate-800/30 border-slate-700"}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-semibold text-white">
                  Phổ biến nhất
                </div>
              )}
              <div
                className={`w-12 h-12 rounded-xl bg-${plan.color}-500/20 flex items-center justify-center mb-4`}
              >
                <Icon className={`w-6 h-6 text-${plan.color}-400`} />
              </div>
              <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              <div className="mt-2 mb-4">
                {plan.price ? (
                  <>
                    <span className="text-3xl font-bold text-white">
                      ${plan.price}
                    </span>
                    <span className="text-slate-400">/{plan.period}</span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-white">Liên hệ</span>
                )}
              </div>
              <p className="text-slate-400 text-sm mb-6">{plan.description}</p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-slate-300"
                  >
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              {plan.id === currentPlan ? (
                <button
                  disabled
                  className="w-full py-3 bg-green-600/20 text-green-400 rounded-xl font-semibold cursor-default"
                >
                  Gói hiện tại
                </button>
              ) : (
                <button
                  onClick={() => handleUpgrade(plan.id)}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2"
                >
                  Nâng cấp <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-900 rounded-2xl border border-slate-700 p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-white mb-4">Thanh toán</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Số thẻ
                </label>
                <input
                  type="text"
                  placeholder="4111 1111 1111 1111"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    MM/YY
                  </label>
                  <input
                    type="text"
                    placeholder="12/25"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Tên chủ thẻ
                </label>
                <input
                  type="text"
                  placeholder="NGUYEN VAN A"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handlePayment}
                  className="flex-1 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium"
                >
                  Thanh toán
                </button>
                <button
                  onClick={() => setShowPayment(false)}
                  className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-medium"
                >
                  Hủy
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
