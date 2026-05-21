"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Star,
  Brain,
  BarChart3,
  AlertTriangle,
  Building2,
  Users,
  Settings,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  TrendingUp,
  Shield,
  Key,
  Bell,
  CreditCard,
  FileText,
  HelpCircle,
  LifeBuoy,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
  children?: NavItem[];
}

const navigation: NavItem[] = [
  { name: "Tổng quan", href: "/dashboard", icon: LayoutDashboard },
  {
    name: "Quản lý đánh giá",
    href: "/dashboard/reviews",
    icon: Star,
    badge: 12,
  },
  {
    name: "AI Command Center",
    href: "/dashboard/ai",
    icon: Brain,
    children: [
      {
        name: "Sentiment Analysis",
        href: "/dashboard/ai/sentiment",
        icon: TrendingUp,
      },
      {
        name: "Response Generation",
        href: "/dashboard/ai/responses",
        icon: MessageSquare,
      },
      {
        name: "Brand Voice",
        href: "/dashboard/ai/brand-voice",
        icon: Sparkles,
      },
      { name: "AI Learning", href: "/dashboard/ai/learning", icon: Brain },
      {
        name: "Performance",
        href: "/dashboard/ai/performance",
        icon: BarChart3,
      },
    ],
  },
  {
    name: "Trung tâm khủng hoảng",
    href: "/dashboard/crisis",
    icon: AlertTriangle,
    badge: 2,
  },
  {
    name: "Phân tích",
    href: "/dashboard/analytics",
    icon: BarChart3,
    children: [
      {
        name: "Realtime",
        href: "/dashboard/analytics/realtime",
        icon: TrendingUp,
      },
      {
        name: "Sentiment Trends",
        href: "/dashboard/analytics/sentiment",
        icon: BarChart3,
      },
      {
        name: "Reputation Score",
        href: "/dashboard/analytics/reputation",
        icon: Shield,
      },
      {
        name: "Branch Performance",
        href: "/dashboard/analytics/branches",
        icon: Building2,
      },
      {
        name: "Team Performance",
        href: "/dashboard/analytics/team",
        icon: Users,
      },
    ],
  },
  {
    name: "Tổ chức",
    href: "/dashboard/organization",
    icon: Building2,
    children: [
      {
        name: "Chi nhánh",
        href: "/dashboard/organization/branches",
        icon: Building2,
      },
      { name: "Nhân viên", href: "/dashboard/organization/staff", icon: Users },
      {
        name: "Phân quyền",
        href: "/dashboard/organization/rbac",
        icon: Shield,
      },
    ],
  },
  {
    name: "Cài đặt",
    href: "/dashboard/settings",
    icon: Settings,
    children: [
      { name: "Hồ sơ", href: "/dashboard/settings/profile", icon: Users },
      {
        name: "Tổ chức",
        href: "/dashboard/settings/organization",
        icon: Building2,
      },
      { name: "AI Configuration", href: "/dashboard/settings/ai", icon: Brain },
      {
        name: "Thông báo",
        href: "/dashboard/settings/notifications",
        icon: Bell,
      },
      {
        name: "Thanh toán",
        href: "/dashboard/settings/billing",
        icon: CreditCard,
      },
      { name: "API Keys", href: "/dashboard/settings/api-keys", icon: Key },
    ],
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([
    "AI Command Center",
    "Phân tích",
    "Tổ chức",
    "Cài đặt",
  ]);
  const pathname = usePathname();

  const toggleExpand = (name: string) => {
    setExpandedItems((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name],
    );
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === href;
    return pathname.startsWith(href);
  };

  const isChildActive = (children?: NavItem[]) => {
    if (!children) return false;
    return children.some((child) => pathname.startsWith(child.href));
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-black border-r border-slate-800 transition-all duration-300 z-30 flex flex-col ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Logo */}
      <div
        className={`p-5 border-b border-slate-800 ${collapsed ? "px-3" : ""}`}
      >
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  ORM AI
                </span>
                <p className="text-[10px] text-slate-500">Reputation OS</p>
              </div>
            )}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-slate-800 transition text-slate-400"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href) || isChildActive(item.children);
          const isExpanded = expandedItems.includes(item.name);

          return (
            <div key={item.name}>
              <button
                onClick={() =>
                  item.children ? toggleExpand(item.name) : undefined
                }
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group ${
                  active
                    ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 border border-blue-500/30"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                }`}
              >
                <Link
                  href={item.children ? "#" : item.href}
                  className="flex items-center gap-3 flex-1"
                  onClick={(e) => item.children && e.preventDefault()}
                >
                  <Icon className="w-5 h-5" />
                  {!collapsed && (
                    <>
                      <span className="text-sm font-medium">{item.name}</span>
                      {item.badge && (
                        <span className="ml-auto px-1.5 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
                {!collapsed && item.children && (
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                  />
                )}
              </button>

              {/* Submenu */}
              {!collapsed && item.children && isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="ml-9 mt-1 space-y-1"
                >
                  {item.children.map((child) => {
                    const ChildIcon = child.icon;
                    const childActive = pathname === child.href;
                    return (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                          childActive
                            ? "bg-blue-600/20 text-blue-400"
                            : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                        }`}
                      >
                        <ChildIcon className="w-4 h-4" />
                        <span>{child.name}</span>
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link
          href="/dashboard/help"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LifeBuoy className="w-5 h-5" />
          {!collapsed && <span className="text-sm">Trợ giúp</span>}
        </Link>
        <Link
          href="/dashboard/docs"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <FileText className="w-5 h-5" />
          {!collapsed && <span className="text-sm">Tài liệu</span>}
        </Link>
      </div>
    </aside>
  );
}
