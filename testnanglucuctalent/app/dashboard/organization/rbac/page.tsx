// app/dashboard/organization/rbac/page.tsx - Nâng cấp hoàn chỉnh
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  CheckCircle,
  XCircle,
  Edit3,
  Plus,
  Trash2,
  Save,
  X,
  Users,
  UserCheck,
  UserX,
  Lock,
  Key,
  Settings,
  Eye,
  EyeOff,
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  Copy,
  RefreshCw,
  AlertTriangle,
  Star,
  Building2,
  MessageCircle,
  BarChart3,
  Brain,
  Zap,
  Activity,
  Bell,
  CreditCard,
  FileText,
  HelpCircle,
} from "lucide-react";
import toast from "react-hot-toast";

// Types
interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  resource: string;
  action:
    | "view"
    | "create"
    | "edit"
    | "delete"
    | "approve"
    | "configure"
    | "export";
}

interface Role {
  id: string;
  name: string;
  description: string;
  color: string;
  permissions: string[];
  userCount: number;
  isDefault?: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  department: string;
  status: "active" | "inactive";
  lastActive: string;
}

// Mock permissions data
const permissionsData: Permission[] = [
  // Dashboard
  {
    id: "view_dashboard",
    name: "Xem Dashboard",
    description: "Xem tổng quan và thống kê",
    category: "Dashboard",
    resource: "dashboard",
    action: "view",
  },
  {
    id: "view_analytics",
    name: "Xem Analytics",
    description: "Xem báo cáo phân tích",
    category: "Dashboard",
    resource: "analytics",
    action: "view",
  },

  // Reviews
  {
    id: "view_reviews",
    name: "Xem đánh giá",
    description: "Xem danh sách đánh giá khách hàng",
    category: "Reviews",
    resource: "reviews",
    action: "view",
  },
  {
    id: "respond_reviews",
    name: "Phản hồi đánh giá",
    description: "Phản hồi đánh giá khách hàng",
    category: "Reviews",
    resource: "reviews",
    action: "edit",
  },
  {
    id: "delete_reviews",
    name: "Xóa đánh giá",
    description: "Xóa đánh giá khách hàng",
    category: "Reviews",
    resource: "reviews",
    action: "delete",
  },

  // AI
  {
    id: "view_ai",
    name: "Xem AI Center",
    description: "Xem trung tâm AI",
    category: "AI",
    resource: "ai",
    action: "view",
  },
  {
    id: "configure_ai",
    name: "Cấu hình AI",
    description: "Cấu hình model và prompt AI",
    category: "AI",
    resource: "ai",
    action: "configure",
  },
  {
    id: "approve_responses",
    name: "Duyệt phản hồi AI",
    description: "Duyệt phản hồi do AI tạo",
    category: "AI",
    resource: "responses",
    action: "approve",
  },
  {
    id: "train_ai",
    name: "Train AI model",
    description: "Huấn luyện model AI",
    category: "AI",
    resource: "ai",
    action: "configure",
  },

  // Crisis
  {
    id: "view_crisis",
    name: "Xem khủng hoảng",
    description: "Xem trung tâm khủng hoảng",
    category: "Crisis",
    resource: "crisis",
    action: "view",
  },
  {
    id: "handle_crisis",
    name: "Xử lý khủng hoảng",
    description: "Xử lý cảnh báo khủng hoảng",
    category: "Crisis",
    resource: "crisis",
    action: "edit",
  },

  // Organization
  {
    id: "view_organization",
    name: "Xem tổ chức",
    description: "Xem thông tin tổ chức",
    category: "Organization",
    resource: "organization",
    action: "view",
  },
  {
    id: "manage_branches",
    name: "Quản lý chi nhánh",
    description: "Thêm/sửa/xóa chi nhánh",
    category: "Organization",
    resource: "branches",
    action: "edit",
  },
  {
    id: "manage_users",
    name: "Quản lý người dùng",
    description: "Quản lý nhân viên và phân quyền",
    category: "Organization",
    resource: "users",
    action: "edit",
  },
  {
    id: "manage_roles",
    name: "Quản lý vai trò",
    description: "Tạo/sửa/xóa vai trò",
    category: "Organization",
    resource: "roles",
    action: "edit",
  },

  // Settings
  {
    id: "view_settings",
    name: "Xem cài đặt",
    description: "Xem trang cài đặt",
    category: "Settings",
    resource: "settings",
    action: "view",
  },
  {
    id: "edit_settings",
    name: "Sửa cài đặt",
    description: "Chỉnh sửa cài đặt hệ thống",
    category: "Settings",
    resource: "settings",
    action: "edit",
  },
  {
    id: "manage_api_keys",
    name: "Quản lý API Keys",
    description: "Tạo/sửa/xóa API keys",
    category: "Settings",
    resource: "api_keys",
    action: "edit",
  },
  {
    id: "view_billing",
    name: "Xem thanh toán",
    description: "Xem thông tin thanh toán",
    category: "Settings",
    resource: "billing",
    action: "view",
  },

  // Reports
  {
    id: "view_reports",
    name: "Xem báo cáo",
    description: "Xem các báo cáo",
    category: "Reports",
    resource: "reports",
    action: "view",
  },
  {
    id: "export_data",
    name: "Xuất dữ liệu",
    description: "Xuất dữ liệu ra file",
    category: "Reports",
    resource: "data",
    action: "export",
  },
];

// Mock roles data
const rolesData: Role[] = [
  {
    id: "super_admin",
    name: "Super Admin",
    description: "Quyền cao nhất, toàn quyền truy cập và cấu hình hệ thống",
    color: "purple",
    permissions: permissionsData.map((p) => p.id),
    userCount: 1,
    isDefault: false,
  },
  {
    id: "admin",
    name: "Admin",
    description:
      "Quản trị viên, có thể quản lý tổ chức, người dùng và cấu hình",
    color: "blue",
    permissions: permissionsData.filter((p) =>
      [
        "view_dashboard",
        "view_analytics",
        "view_reviews",
        "respond_reviews",
        "view_ai",
        "configure_ai",
        "approve_responses",
        "view_crisis",
        "handle_crisis",
        "view_organization",
        "manage_branches",
        "manage_users",
        "view_settings",
        "edit_settings",
        "view_reports",
        "export_data",
      ].map((p) => p.id),
    ),
    userCount: 2,
    isDefault: true,
  },
  {
    id: "manager",
    name: "Manager",
    description: "Quản lý, có thể xem và phản hồi đánh giá, xem báo cáo",
    color: "green",
    permissions: permissionsData.filter((p) =>
      [
        "view_dashboard",
        "view_analytics",
        "view_reviews",
        "respond_reviews",
        "view_ai",
        "view_crisis",
        "view_organization",
        "view_reports",
      ].map((p) => p.id),
    ),
    userCount: 3,
    isDefault: true,
  },
  {
    id: "staff",
    name: "Staff",
    description: "Nhân viên, chỉ có thể xem đánh giá và dashboard cơ bản",
    color: "gray",
    permissions: permissionsData.filter((p) =>
      ["view_dashboard", "view_reviews"].map((p) => p.id),
    ),
    userCount: 5,
    isDefault: true,
  },
];

// Mock users data
const usersData: User[] = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    email: "nguyenvana@demo.com",
    avatar: "NA",
    role: "super_admin",
    department: "Ban Giám đốc",
    status: "active",
    lastActive: "2024-01-20T10:30:00Z",
  },
  {
    id: "2",
    name: "Trần Thị B",
    email: "tranthib@demo.com",
    avatar: "TB",
    role: "admin",
    department: "Hành chính",
    status: "active",
    lastActive: "2024-01-19T15:45:00Z",
  },
  {
    id: "3",
    name: "Lê Văn C",
    email: "levanc@demo.com",
    avatar: "LC",
    role: "manager",
    department: "Kinh doanh",
    status: "active",
    lastActive: "2024-01-18T09:20:00Z",
  },
  {
    id: "4",
    name: "Phạm Thị D",
    email: "phamthid@demo.com",
    avatar: "PD",
    role: "staff",
    department: "Chăm sóc khách hàng",
    status: "active",
    lastActive: "2024-01-17T14:10:00Z",
  },
  {
    id: "5",
    name: "Hoàng Văn E",
    email: "hoangvane@demo.com",
    avatar: "HE",
    role: "staff",
    department: "Kỹ thuật",
    status: "inactive",
    lastActive: "2024-01-10T11:00:00Z",
  },
];

// Category icons
const categoryIcons: Record<string, any> = {
  Dashboard: BarChart3,
  Reviews: MessageCircle,
  AI: Brain,
  Crisis: AlertTriangle,
  Organization: Building2,
  Settings: Settings,
  Reports: FileText,
};

// Role color mapping
const roleColors: Record<string, string> = {
  purple: "from-purple-600 to-purple-500",
  blue: "from-blue-600 to-blue-500",
  green: "from-green-600 to-green-500",
  gray: "from-gray-600 to-gray-500",
};

export default function RBACPage() {
  const [roles, setRoles] = useState<Role[]>(rolesData);
  const [users, setUsers] = useState<User[]>(usersData);
  const [permissions, setPermissions] = useState<Permission[]>(permissionsData);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<"roles" | "users">("roles");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [showEditRoleModal, setShowEditRoleModal] = useState(false);
  const [showAssignRoleModal, setShowAssignRoleModal] = useState(false);
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    color: "blue",
  });
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  // Get categories
  const categories = ["all", ...new Set(permissions.map((p) => p.category))];

  // Filter permissions
  const filteredPermissions = permissions.filter(
    (p) => filterCategory === "all" || p.category === filterCategory,
  );

  // Group permissions by category
  const groupedPermissions = filteredPermissions.reduce(
    (acc, permission) => {
      if (!acc[permission.category]) acc[permission.category] = [];
      acc[permission.category].push(permission);
      return acc;
    },
    {} as Record<string, Permission[]>,
  );

  // Filter users
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.department.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleTogglePermission = (roleId: string, permissionId: string) => {
    setRoles((prev) =>
      prev.map((role) =>
        role.id === roleId
          ? {
              ...role,
              permissions: role.permissions.includes(permissionId)
                ? role.permissions.filter((p) => p !== permissionId)
                : [...role.permissions, permissionId],
            }
          : role,
      ),
    );
    toast.success("Đã cập nhật quyền");
  };

  const handleAddRole = () => {
    if (!newRole.name.trim()) {
      toast.error("Vui lòng nhập tên vai trò");
      return;
    }
    const newId = newRole.name.toLowerCase().replace(/\s+/g, "_");
    const role: Role = {
      id: newId,
      name: newRole.name,
      description: newRole.description || `Vai trò ${newRole.name}`,
      color: newRole.color,
      permissions: [],
      userCount: 0,
    };
    setRoles((prev) => [...prev, role]);
    setNewRole({ name: "", description: "", color: "blue" });
    setShowAddRoleModal(false);
    toast.success("Đã thêm vai trò mới");
  };

  const handleUpdateRole = () => {
    if (!editingRole) return;
    setRoles((prev) =>
      prev.map((role) => (role.id === editingRole.id ? editingRole : role)),
    );
    setShowEditRoleModal(false);
    setEditingRole(null);
    toast.success("Đã cập nhật vai trò");
  };

  const handleDeleteRole = (roleId: string) => {
    const role = roles.find((r) => r.id === roleId);
    if (role?.isDefault) {
      toast.error("Không thể xóa vai trò mặc định");
      return;
    }
    if (role?.userCount && role.userCount > 0) {
      toast.error(`Không thể xóa vai trò đang có ${role.userCount} người dùng`);
      return;
    }
    if (confirm(`Xóa vai trò "${role?.name}"?`)) {
      setRoles((prev) => prev.filter((r) => r.id !== roleId));
      toast.success("Đã xóa vai trò");
    }
  };

  const handleAssignRole = (userId: string, roleId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, role: roleId } : user,
      ),
    );
    // Update user count in roles
    setRoles((prev) =>
      prev.map((role) => ({
        ...role,
        userCount: users.filter((u) => u.role === role.id).length,
      })),
    );
    setShowAssignRoleModal(false);
    setSelectedUser(null);
    toast.success("Đã gán vai trò");
  };

  const getRoleById = (roleId: string) => roles.find((r) => r.id === roleId);

  const getPermissionStatus = (role: Role, permissionId: string) => {
    return role.permissions.includes(permissionId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Shield className="w-7 h-7 text-purple-400" />
            Phân quyền & RBAC
          </h1>
          <p className="text-slate-400 mt-1">
            Quản lý vai trò, phân quyền truy cập và gán quyền cho người dùng
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() =>
              setActiveTab(activeTab === "roles" ? "users" : "roles")
            }
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm flex items-center gap-2"
          >
            {activeTab === "roles" ? (
              <Users className="w-4 h-4" />
            ) : (
              <Shield className="w-4 h-4" />
            )}
            {activeTab === "roles" ? "Quản lý người dùng" : "Quản lý vai trò"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-800">
        <button
          onClick={() => setActiveTab("roles")}
          className={`px-5 py-2.5 font-medium transition-all rounded-t-lg flex items-center gap-2 ${activeTab === "roles" ? "bg-slate-800/50 text-purple-400 border-b-2 border-purple-500" : "text-slate-400 hover:text-slate-200"}`}
        >
          <Shield className="w-4 h-4" /> Quản lý vai trò
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`px-5 py-2.5 font-medium transition-all rounded-t-lg flex items-center gap-2 ${activeTab === "users" ? "bg-slate-800/50 text-purple-400 border-b-2 border-purple-500" : "text-slate-400 hover:text-slate-200"}`}
        >
          <Users className="w-4 h-4" /> Quản lý người dùng
        </button>
      </div>

      {/* Roles Management */}
      {activeTab === "roles" && (
        <div className="space-y-6">
          {/* Roles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {roles.map((role) => {
              const colorClass = roleColors[role.color] || roleColors.blue;
              return (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-5 rounded-xl border ${selectedRole?.id === role.id ? "border-purple-500 bg-purple-500/10" : "border-slate-700 bg-slate-800/30"} cursor-pointer hover:scale-[1.02] transition`}
                  onClick={() => setSelectedRole(role)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center`}
                    >
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    {!role.isDefault && (
                      <div className="flex gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingRole(role);
                            setShowEditRoleModal(true);
                          }}
                          className="p-1.5 hover:bg-slate-700 rounded-lg transition"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-slate-400" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteRole(role.id);
                          }}
                          className="p-1.5 hover:bg-red-500/20 rounded-lg transition"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-400" />
                        </button>
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-white">{role.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {role.description}
                  </p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs text-slate-500">
                      {role.permissions.length} quyền
                    </span>
                    <span className="text-xs text-blue-400">
                      {role.userCount} người dùng
                    </span>
                  </div>
                  {role.isDefault && (
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-slate-700 rounded-full">
                      <Star className="w-3 h-3 text-yellow-400" />
                      <span className="text-xs text-slate-400">Mặc định</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setShowAddRoleModal(true)}
              className="p-5 rounded-xl border border-dashed border-slate-600 bg-slate-800/20 hover:bg-slate-800/40 transition flex flex-col items-center justify-center gap-2"
            >
              <Plus className="w-8 h-8 text-slate-400" />
              <span className="text-sm text-slate-400">Thêm vai trò mới</span>
            </motion.button>
          </div>

          {/* Permission Matrix */}
          {selectedRole && (
            <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Lock className="w-5 h-5 text-purple-400" />
                  Phân quyền cho vai trò:{" "}
                  <span className="text-purple-400">{selectedRole.name}</span>
                </h3>
                <div className="flex gap-2">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat === "all" ? "Tất cả danh mục" : cat}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => setFilterCategory("all")}
                    className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-white text-sm"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {Object.entries(groupedPermissions).map(([category, perms]) => {
                  const CategoryIcon = categoryIcons[category] || Shield;
                  return (
                    <div
                      key={category}
                      className="border-b border-slate-700 last:border-0 pb-4"
                    >
                      <h4 className="text-md font-semibold text-white mb-3 flex items-center gap-2">
                        <CategoryIcon className="w-4 h-4 text-blue-400" />
                        {category}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {perms.map((permission) => {
                          const isEnabled = getPermissionStatus(
                            selectedRole,
                            permission.id,
                          );
                          return (
                            <div
                              key={permission.id}
                              className={`flex items-center justify-between p-3 rounded-lg transition cursor-pointer ${isEnabled ? "bg-green-500/10 border border-green-500/30" : "bg-slate-800/50 border border-slate-700"}`}
                              onClick={() =>
                                handleTogglePermission(
                                  selectedRole.id,
                                  permission.id,
                                )
                              }
                            >
                              <div>
                                <p className="text-sm text-white">
                                  {permission.name}
                                </p>
                                <p className="text-xs text-slate-500">
                                  {permission.description}
                                </p>
                              </div>
                              {isEnabled ? (
                                <CheckCircle className="w-5 h-5 text-green-400" />
                              ) : (
                                <XCircle className="w-5 h-5 text-slate-500" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700 flex justify-end">
                <button
                  onClick={() => toast.success("Đã lưu cấu hình phân quyền")}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white text-sm font-medium flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Lưu thay đổi
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Users Management */}
      {activeTab === "users" && (
        <div className="space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-wrap gap-3 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Tìm kiếm người dùng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm"
              />
            </div>
            <button className="px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm flex items-center gap-2">
              <Plus className="w-4 h-4" /> Thêm người dùng
            </button>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-700">
                <tr className="text-left text-slate-400 text-sm">
                  <th className="pb-3">Người dùng</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Phòng ban</th>
                  <th className="pb-3">Vai trò</th>
                  <th className="pb-3">Trạng thái</th>
                  <th className="pb-3">Hoạt động cuối</th>
                  <th className="pb-3"></th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const userRole = getRoleById(user.role);
                  return (
                    <tr
                      key={user.id}
                      className="border-b border-slate-700/50 hover:bg-slate-800/30"
                    >
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                            <span className="text-white text-xs font-medium">
                              {user.avatar}
                            </span>
                          </div>
                          <span className="text-white">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-3 text-slate-400 text-sm">
                        {user.email}
                      </td>
                      <td className="py-3 text-slate-400 text-sm">
                        {user.department}
                      </td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${userRole?.color === "purple" ? "bg-purple-500/20 text-purple-400" : userRole?.color === "blue" ? "bg-blue-500/20 text-blue-400" : userRole?.color === "green" ? "bg-green-500/20 text-green-400" : "bg-slate-500/20 text-slate-400"}`}
                        >
                          {userRole?.name || user.role}
                        </span>
                      </td>
                      <td className="py-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${user.status === "active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
                        >
                          {user.status === "active" ? (
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                          ) : (
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                          )}
                          {user.status === "active" ? "Hoạt động" : "Khóa"}
                        </span>
                      </td>
                      <td className="py-3 text-slate-400 text-sm">
                        {new Date(user.lastActive).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="py-3">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowAssignRoleModal(true);
                          }}
                          className="p-1.5 hover:bg-slate-700 rounded-lg transition"
                        >
                          <Edit3 className="w-4 h-4 text-blue-400" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12 bg-slate-800/30 rounded-xl border border-slate-700">
              <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">Không tìm thấy người dùng nào</p>
            </div>
          )}
        </div>
      )}

      {/* Add Role Modal */}
      <AnimatePresence>
        {showAddRoleModal && (
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
              className="bg-slate-900 rounded-2xl border border-slate-700 p-6 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">
                  Thêm vai trò mới
                </h3>
                <button
                  onClick={() => setShowAddRoleModal(false)}
                  className="p-1 hover:bg-slate-800 rounded"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Tên vai trò
                  </label>
                  <input
                    type="text"
                    value={newRole.name}
                    onChange={(e) =>
                      setNewRole({ ...newRole, name: e.target.value })
                    }
                    placeholder="VD: Marketing Manager"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Mô tả
                  </label>
                  <textarea
                    rows={3}
                    value={newRole.description}
                    onChange={(e) =>
                      setNewRole({ ...newRole, description: e.target.value })
                    }
                    placeholder="Mô tả vai trò..."
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Màu sắc
                  </label>
                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        setNewRole({ ...newRole, color: "purple" })
                      }
                      className={`w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-500 ${newRole.color === "purple" ? "ring-2 ring-white" : ""}`}
                    />
                    <button
                      onClick={() => setNewRole({ ...newRole, color: "blue" })}
                      className={`w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 ${newRole.color === "blue" ? "ring-2 ring-white" : ""}`}
                    />
                    <button
                      onClick={() => setNewRole({ ...newRole, color: "green" })}
                      className={`w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-green-500 ${newRole.color === "green" ? "ring-2 ring-white" : ""}`}
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleAddRole}
                    className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium"
                  >
                    Thêm vai trò
                  </button>
                  <button
                    onClick={() => setShowAddRoleModal(false)}
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

      {/* Edit Role Modal */}
      <AnimatePresence>
        {showEditRoleModal && editingRole && (
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
              className="bg-slate-900 rounded-2xl border border-slate-700 p-6 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Sửa vai trò</h3>
                <button
                  onClick={() => setShowEditRoleModal(false)}
                  className="p-1 hover:bg-slate-800 rounded"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Tên vai trò
                  </label>
                  <input
                    type="text"
                    value={editingRole.name}
                    onChange={(e) =>
                      setEditingRole({ ...editingRole, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Mô tả
                  </label>
                  <textarea
                    rows={3}
                    value={editingRole.description}
                    onChange={(e) =>
                      setEditingRole({
                        ...editingRole,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleUpdateRole}
                    className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium"
                  >
                    Lưu thay đổi
                  </button>
                  <button
                    onClick={() => setShowEditRoleModal(false)}
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

      {/* Assign Role Modal */}
      <AnimatePresence>
        {showAssignRoleModal && selectedUser && (
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
              className="bg-slate-900 rounded-2xl border border-slate-700 p-6 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Gán vai trò</h3>
                <button
                  onClick={() => setShowAssignRoleModal(false)}
                  className="p-1 hover:bg-slate-800 rounded"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <p className="text-white font-medium">{selectedUser.name}</p>
                  <p className="text-xs text-slate-400">{selectedUser.email}</p>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Chọn vai trò
                  </label>
                  <div className="space-y-2">
                    {roles.map((role) => (
                      <div
                        key={role.id}
                        onClick={() =>
                          handleAssignRole(selectedUser.id, role.id)
                        }
                        className={`p-3 rounded-lg cursor-pointer transition border ${selectedUser.role === role.id ? "border-purple-500 bg-purple-500/20" : "border-slate-700 bg-slate-800/50"}`}
                      >
                        <p className="text-white">{role.name}</p>
                        <p className="text-xs text-slate-400">
                          {role.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
