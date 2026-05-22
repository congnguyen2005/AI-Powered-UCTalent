// app/page.tsx (sửa lỗi)
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Sparkles,
  Star,
  Brain,
  BarChart3,
  Zap,
  Shield,
  TrendingUp,
  Clock,
  CheckCircle,
  MessageCircle,
  AlertTriangle,
  Users,
  Globe,
  Lock,
  Cloud,
  Cpu,
  ArrowRight,
  Menu,
  X,
  ChevronRight,
  Play,
  Quote,
  Mail,
  Phone,
  MapPin,
  // Facebook, Twitter, Linkedin, Github - KHÔNG CÓ TRONG lucide-react
  // Thay bằng các icon khác hoặc bỏ
} from "lucide-react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const features = [
    {
      icon: Brain,
      title: "AI Response Generation",
      description:
        "Generate intelligent customer responses using AI with contextual sentiment understanding.",
      color: "from-purple-500 to-pink-500",
      bgColor: "purple",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Monitor reviews, customer emotions, trends, and business reputation in realtime.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "blue",
    },
    {
      icon: AlertTriangle,
      title: "Crisis Detection",
      description:
        "Detect negative review spikes and customer reputation risks instantly using AI.",
      color: "from-red-500 to-orange-500",
      bgColor: "red",
    },
  ];

  const stats = [
    { value: "98%", label: "AI Accuracy", icon: Brain, suffix: "" },
    { value: "24/7", label: "Realtime Monitoring", icon: Clock, suffix: "" },
    { value: "10x", label: "Faster Responses", icon: Zap, suffix: "" },
    { value: "AI", label: "Powered Automation", icon: Cpu, suffix: "" },
  ];

  const testimonials = [
    {
      quote:
        "ORM AI đã thay đổi cách chúng tôi quản lý danh tiếng trực tuyến. Thời gian phản hồi giảm 80%.",
      author: "Nguyễn Văn A",
      position: "Giám đốc Marketing, Khách sạn ABC",
      rating: 5,
    },
    {
      quote:
        "Phát hiện khủng hoảng realtime giúp chúng tôi xử lý kịp thời, tránh thiệt hại lớn về danh tiếng.",
      author: "Trần Thị B",
      position: "Head of Customer Experience, Chuỗi nhà hàng XYZ",
      rating: 5,
    },
    {
      quote:
        "AI tạo phản hồi thông minh, tiết kiệm hàng giờ làm việc mỗi ngày. Tỷ lệ duyệt lên đến 87%.",
      author: "Lê Văn C",
      position: "Operations Director, Spa & Clinic",
      rating: 5,
    },
  ];

  const pricing = [
    {
      name: "Starter",
      price: "$49",
      period: "/tháng",
      description: "Dành cho doanh nghiệp nhỏ",
      features: [
        "Up to 500 reviews/month",
        "Basic AI responses",
        "Sentiment analysis",
        "Email support",
        "Basic analytics",
      ],
      button: "Bắt đầu dùng thử",
      popular: false,
    },
    {
      name: "Professional",
      price: "$149",
      period: "/tháng",
      description: "Dành cho doanh nghiệp đang phát triển",
      features: [
        "Up to 5,000 reviews/month",
        "Advanced AI responses",
        "Real-time crisis detection",
        "Priority support 24/7",
        "Advanced analytics & reporting",
        "Multi-branch management",
        "API access",
      ],
      button: "Dùng thử ngay",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Liên hệ",
      period: "",
      description: "Dành cho tập đoàn lớn",
      features: [
        "Unlimited reviews",
        "Custom AI training",
        "Dedicated AI instance",
        "24/7 dedicated support",
        "Custom analytics dashboard",
        "SLA guarantee 99.9%",
        "On-premise deployment",
      ],
      button: "Liên hệ tư vấn",
      popular: false,
    },
  ];

  const navItems = [
    { label: "Tính năng", href: "#features" },
    { label: "Giải pháp", href: "#solutions" },
    { label: "Bảng giá", href: "#pricing" },
    { label: "Khách hàng", href: "#testimonials" },
    { label: "Tài liệu", href: "#docs" },
  ];

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ORM AI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-slate-300 hover:text-white transition text-sm font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/auth/login"
                className="px-4 py-2 text-slate-300 hover:text-white transition text-sm font-medium"
              >
                Đăng nhập
              </Link>
              <Link
                href="/auth/register"
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg text-sm font-medium transition shadow-lg shadow-blue-500/25"
              >
                Đăng ký miễn phí
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5 text-white"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
            >
              <div className="px-4 py-4 space-y-3">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-slate-300 hover:text-white transition"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="pt-4 flex flex-col gap-3">
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2 text-center text-slate-300 hover:text-white transition"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 text-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition"
                  >
                    Đăng ký miễn phí
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <motion.div
          style={{ opacity, scale }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 text-sm text-blue-300">
              <Sparkles className="w-4 h-4" />
              AI Reputation Operating System
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-6"
          >
            AI-Powered{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              ORM Platform
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 mb-10"
          >
            Enterprise AI platform for customer review management, sentiment
            analysis, crisis detection, realtime analytics, and automated AI
            response generation.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:scale-105 flex items-center gap-2"
            >
              Launch Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#features"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
            >
              View Analytics
              <BarChart3 className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <div className="flex justify-center mb-2">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-slate-400">{stat.label}</p>
                </div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Enterprise ORM Infrastructure
            </h2>
            <p className="text-xl text-slate-400">
              Realtime AI systems for modern businesses
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                >
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-white/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How AI ORM Works
            </h2>
            <p className="text-xl text-slate-400">
              From customer feedback to intelligent response in seconds
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Collect",
                desc: "Gather reviews from all platforms automatically",
                icon: MessageCircle,
              },
              {
                step: "02",
                title: "Analyze",
                desc: "AI analyzes sentiment and detects crisis",
                icon: Brain,
              },
              {
                step: "03",
                title: "Generate",
                desc: "AI creates context-aware responses",
                icon: Sparkles,
              },
              {
                step: "04",
                title: "Approve",
                desc: "Human approval with one click",
                icon: CheckCircle,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div className="relative">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-blue-400" />
                    </div>
                    {idx < 3 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent" />
                    )}
                  </div>
                  <p className="text-2xl font-bold text-blue-400 mb-2">
                    {item.step}
                  </p>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="relative py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Trusted by Leading Brands
            </h2>
            <p className="text-xl text-slate-400">
              See what our customers are saying
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10"
              >
                <Quote className="w-8 h-8 text-blue-400/50 mb-4" />
                <p className="text-slate-300 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-medium">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      {testimonial.author}
                    </p>
                    <p className="text-xs text-slate-400">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-white/5 to-transparent"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-400">
              Choose the plan that works for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative p-8 rounded-2xl border transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-blue-500/50 shadow-xl shadow-blue-500/10"
                    : "bg-white/5 border-white/10 hover:border-white/20"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-xs font-semibold text-white">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-slate-400">{plan.period}</span>
                </div>
                <p className="text-slate-400 text-sm mb-6">
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-center gap-2 text-sm text-slate-300"
                    >
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-xl font-semibold transition ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
                  }`}
                >
                  {plan.button}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-12 rounded-3xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 backdrop-blur-sm"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Reputation Management?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Join thousands of businesses using AI to manage customer reviews
              and protect their brand reputation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/register"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-blue-500/25 flex items-center gap-2"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#features"
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
              >
                Watch Demo
                <Play className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  ORM AI
                </span>
              </div>
              <p className="text-slate-400 text-sm mb-4 max-w-md">
                AI-Powered Reputation Management Platform helping businesses
                protect and enhance their online reputation.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
                >
                  <Globe className="w-4 h-4 text-slate-400" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
                >
                  <MessageCircle className="w-4 h-4 text-slate-400" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
                >
                  <Users className="w-4 h-4 text-slate-400" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
                >
                  <Star className="w-4 h-4 text-slate-400" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#features"
                    className="text-slate-400 hover:text-white text-sm transition"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-slate-400 hover:text-white text-sm transition"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white text-sm transition"
                  >
                    API
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white text-sm transition"
                  >
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white text-sm transition"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white text-sm transition"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white text-sm transition"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white text-sm transition"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white text-sm transition"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white text-sm transition"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white text-sm transition"
                  >
                    Security
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white text-sm transition"
                  >
                    GDPR
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center text-slate-500 text-sm">
            <p>&copy; 2026 AI ORM Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
